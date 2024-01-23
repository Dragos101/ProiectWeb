import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-migration-details',
  templateUrl: './migration-details.component.html',
  styleUrls: ['./migration-details.component.sass']
})
export class MigrationDetailsComponent implements OnInit {
  id: string | null = null;

  constructor(private router: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.router.paramMap.subscribe({
      next: (params) => {
        this.id = params.get("id");
      }
    })
  }

}
