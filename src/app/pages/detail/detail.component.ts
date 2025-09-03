import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { FormattedData } from 'src/app/core/models/FormattedData';
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
  results: FormattedData[] = [];
  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  trimLabels: boolean = false;

  rawData!: Olympic[];
  numberOfCountries!: number;
  numberOfJOs!: number;

  constructor(private olympicService: OlympicService, private route: ActivatedRoute) {}

  ngOnInit(): void {

    const id = this.route.snapshot.params['id'];
    
    
  }

  ngOnDestroy(): void {
      
  }
}
