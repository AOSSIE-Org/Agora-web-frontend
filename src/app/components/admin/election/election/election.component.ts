import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ElectionService } from '../../../../services/election.service';
import { Election } from '../../../../model/election.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Winner } from '../../../../model/winner.model';
import * as Moment from 'moment';

@Component({
  selector: 'app-election',
  templateUrl: './election.component.html',
  styleUrls: ['./election.component.scss']
})
export class ElectionComponent implements OnInit {

  election = new Election();
  winners: Winner[] = new Array();
  constructor(private router: Router, private electionService: ElectionService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.electionService.getElection(params["id"]).subscribe((data: Election) => {
        console.log(data)
        this.election = data;
      },
        (err: HttpErrorResponse) => {
          this.router.navigate(['/dashboard']);
        })
      this.electionService.getResults(params["id"]).subscribe((data: Winner[]) => {
        this.election.winners = data;
      })
    })
   }

  ngOnInit() {
  }

  addVoters() {
    if(!("Finish" === this.getStatus(this.election)))
      this.router.navigate(["election/"+ this.election._id + "/voters"]);
  }

  isFinished() {
    if ("Finish" === this.getStatus(this.election))
      return true
    else 
      return false
  }

  getDisplayDate(date: string) : string {
    return Moment.utc(date, "YYYY-MM-DDTHH:mm:ssZ", false).local(true).toDate().toLocaleString()
  }

  getStatus(election: Election): string {
    let now = new Date().getTime();
    let start = Moment.utc(election.start, "YYYY-MM-DDTHH:mm:ssZ", false).local(true).toDate().getTime()
    let end = Moment.utc(election.end, "YYYY-MM-DDTHH:mm:ssZ", true).local(true).toDate().getTime()
    if (now < start)
      return "Pending";
    else if (now > start && now < end)
      return "Active";
    else return "Finish";
  }

}
