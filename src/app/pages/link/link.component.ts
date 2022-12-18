import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Settings } from 'src/app/utility/settings';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    Settings.CurrentUrl.next(this.router.url);
  }


}
