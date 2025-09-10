import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, catchError, of } from 'rxjs';
import { FormattedData, FormattedDetailedData } from 'src/app/core/models/FormattedData';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy{

  subscription!: Subscription;

  id!: number;

  view: [number, number] = [700, 250];
  results: FormattedDetailedData[] = [];
  gradient: boolean = false;
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  xAxisLabel: string = "Dates";
  yAxisLabel: string = "Number of medals";
  showLegend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = false;
  
  numberOfEntries!: number;
  totalNumberMedals!: number;
  totalNumberOfAthletes!: number;

  constructor(private olympicService: OlympicService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.id = parseInt(this.route.snapshot.params['id']);

    this.subscription = this.olympicService.getOlympicById(this.id).subscribe((data) => {
      
      if (data) {

          this.view = [innerWidth / 1.2, 250];

          this.results = this.formatData(data);
          this.numberOfEntries = this.getNumberOfEntries(data);
          this.totalNumberMedals = this.getNumberOfMedals(data);
          this.totalNumberOfAthletes = this.getNumberOfAthletes(data);
      } else {
        
        this.router.navigate(["**"]);

        console.error(`Could not find country with ID : ${this.id}`);
      }
    });
  }

  ngOnDestroy(): void {
      
    this.subscription.unsubscribe();
  }

  formatData(data: Olympic) {
    
    let formattedStats: FormattedData[] = [];

    data.participations.forEach((participation) => {

      formattedStats.push({
        name: participation.year.toString(),
        value: participation.medalsCount
      })
    })

    let formattedData: FormattedDetailedData[] = [];

    formattedData.push({
      name: data.country,
      series: formattedStats
    })

    return formattedData;
  }

  getNumberOfEntries(country: Olympic) {

    return country.participations.length;
  }

  getNumberOfMedals(country: Olympic) {
    
    return country.participations.reduce((sum, participation) => sum + participation.medalsCount, 0);
  }

  getNumberOfAthletes(country: Olympic) {
    
    return country.participations.reduce((sum, participation) => sum + participation.athleteCount, 0);
  }

  onResize(event: any) {
    this.view = [event.target.innerWidth / 1.5, 400];
  }
}
