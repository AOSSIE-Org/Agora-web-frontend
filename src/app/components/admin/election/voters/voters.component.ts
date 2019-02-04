import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { Voter } from '../../../../model/voter.model';
import { ElectionService } from '../../../../services/election.service';
import { Election } from '../../../../model/election.model';

declare var $: any;

@Component({
  selector: 'app-voters',
  templateUrl: './voters.component.html',
  styleUrls: ['./voters.component.scss']
})
export class VotersComponent implements OnInit {

  voter = new Voter();
  voters: Voter[] = new Array<Voter>();
  isLoading = false;
  buttonText = 'Submit';
  id = '';
  constructor(private router: Router, private electionService: ElectionService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.electionService.getElection(this.id).subscribe((data: Election) => {
        this.voters = data.voters;
      },
        (err: HttpErrorResponse) => {
          this.router.navigate(['/dashboard']);
        });
    });
  }

  ngOnInit() {
  }

  delete(index) {
    Swal({
      title: 'Delete',
      text: 'Are you sure you want to delete this voter?',
      type: 'warning',
      confirmButtonColor: '#FFCD00',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        this.voters.splice(index, 1);
      }
    });
  }

  add() {
    let isFound = false;
    this.voters.forEach(value => {
      if (value.email.trim().toLowerCase() === this.voter.email.trim().toLowerCase()) {
        isFound = true;
      }
    });

    if (isFound) {
      this.showNotification('danger', 'Voter with same email already exist');
    } else {
      this.voter.email.trim();
      this.voters.push(this.voter);
      this.voter.email;
      this.voter = new Voter();
    }
  }

  submit() {
    this.isLoading = true;
    this.buttonText = 'Loading';
    this.electionService.addVoters(this.id, this.voters).subscribe((data: any) => {
      this.isLoading = false;
      this.buttonText = 'Submit';
      this.voter = new Voter();
      this.showNotification('success', 'Voters list was successfully updated');
    },
      (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.buttonText = 'Submit';
        if (err.status === 200) {
          this.voter = new Voter();
          this.showNotification('success', 'Voters list was successfully updated');
        } else {
          this.showNotification(
            'danger',
            'Unable to update voters list. Please make sure you are connected to the internet and try again later'
          );
        }
      });
  }

  cancel() {
    this.router.navigate(['/dashboard']);
  }

  hasVoters() {
    if (this.voters.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  showNotification(notifType, message) {
    $.notify({
      icon: notifType === 'success' ? 'done' : 'notifications',
      message: message

    }, {
        type: notifType,
        timer: 4000,
        placement: {
          from: 'top',
          align: 'right'
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
  }

}
