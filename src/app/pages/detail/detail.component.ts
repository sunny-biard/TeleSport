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
  public olympics$: Observable<Olympic[]> = of([]);

  subscription!: Subscription;

  view: [number, number] = [700, 400];
  results!: FormattedDetailedData[];
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

  countryDetails!: Olympic;
  
  numberOfEntries!: number;
  totalNumberMedals!: number;
  totalNumberOfAthletes!: number;

  constructor(private olympicService: OlympicService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {

    const id = parseInt(this.route.snapshot.params['id']);
    
    this.olympics$ = this.olympicService.getOlympics();

    this.subscription = this.olympics$.subscribe((data) => {
      
      if (data) {

        data.some((country) => {

          if (country.id === id) {

            this.countryDetails = country;

            return true;
          }

          return false;
        })

        this.numberOfEntries = this.countryDetails.participations.length;
        this.totalNumberMedals = this.countryDetails.participations.reduce((sum, participation) => sum + participation.medalsCount, 0);
        this.totalNumberOfAthletes = this.countryDetails.participations.reduce((sum, participation) => sum + participation.athleteCount, 0);

        this.results = this.formatData(this.countryDetails);
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

  onResize(event: any) {
    this.view = [event.target.innerWidth / 1.5, 400];
  }
}
