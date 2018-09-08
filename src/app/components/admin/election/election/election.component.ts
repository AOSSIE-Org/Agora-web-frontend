import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ElectionService } from '../../../../services/election.service';
import { Election } from '../../../../model/election.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Winner } from '../../../../model/winner.model';

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
        this.election.start = new Date(this.election.start).toLocaleString()
        this.election.end = new Date(this.election.end).toLocaleString();
        this.election.createdTime = new Date(this.election.createdTime).toLocaleString();
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

  getStatus(election: Election): string {
    let now = new Date().getTime();
    let start = new Date(new Date(election.start).toLocaleString()).getTime();
    let end = new Date(new Date(election.end).toLocaleString()).getTime();
    if (now < start)
      return "Pending";
    else if (now > start && now < end)
      return "Active";
    else return "Finish";
  }

}
