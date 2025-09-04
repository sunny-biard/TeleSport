import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, catchError, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { FormattedData } from 'src/app/core/models/FormattedData';
import { Olympic } from 'src/app/core/models/Olympic';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public olympics$: Observable<Olympic[]> = of([]);

  subscription!: Subscription;

  view: [number, number] = [700, 400];
  results: FormattedData[] = [];
  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  trimLabels: boolean = false;

  rawData!: Olympic[];
  numberOfCountries!: number;
  numberOfJOs!: number;

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    
    this.olympics$ = this.olympicService.getOlympics();

    this.subscription = this.olympics$.subscribe((data) => {
      
      if (data) {
        
        this.results = this.formatData(data);
        this.rawData = data;
        this.numberOfCountries = data.length;

        let JOs: number[] = [];

        data.forEach((country) => {

          country.participations.forEach((participation) => {

            if (!JOs.includes(participation.year)) {

              JOs.push(participation.year);
            }
          })
        })

        this.numberOfJOs = JOs.length;
      }
    });
  }

  ngOnDestroy(): void {
    
    this.subscription.unsubscribe();
  }

  formatData(data: Olympic[]) {
    
    let formattedData: FormattedData[] = [];

    data.forEach((country) => {

      let medals = 0;

      if (country.participations) {

        medals = country.participations.reduce((sum, participation) => sum + participation.medalsCount, 0);
      }

      formattedData.push({
        name: country.country,
        value: medals
      })
    })

    return formattedData;
  }

  onSelect(event: FormattedData): void {

    const countrySelected = this.rawData.find((country) => country.country === event.name)

    if (countrySelected) {
      
      this.router.navigate(['/country', countrySelected.id])
    } else {

      console.error("ERROR : Could not find country.");
    }
  }

  onResize(event: any) {
    this.view = [event.target.innerWidth / 1.1, 400];
}
}
