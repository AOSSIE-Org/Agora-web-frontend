import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../../../node_modules/@angular/router';
import { ElectionService } from '../../../../services/election.service';
import { Election } from '../../../../model/election.model';
import { HttpErrorResponse } from '../../../../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-election',
  templateUrl: './election.component.html',
  styleUrls: ['./election.component.scss']
})
export class ElectionComponent implements OnInit {

  election = new Election();
  constructor(private router: Router, private electionService: ElectionService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      console.log(params["id"])
      this.electionService.getElection(params["id"]).subscribe((data: Election) => {
        this.election = data;
      },
        (err: HttpErrorResponse) => {
          this.router.navigate(['/dashboard']);
        })
    })
   }

  ngOnInit() {
  }

}
