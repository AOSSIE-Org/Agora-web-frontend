import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

import { ElectionDataService } from '../../../../services/election-data.service';
import { ElectionFormFive } from '../../../../model/election/election-form-five.model';
import { ElectionService } from '../../../../services/election.service';

declare var $: any;

@Component({
  selector: 'app-election-form-five',
  templateUrl: './election-form-five.component.html',
  styleUrls: ['./election-form-five.component.scss']
})
export class ElectionFormFiveComponent implements OnInit {
  form5 = new ElectionFormFive();
  isLoading = false;
  buttonStatus = 'Finish';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private electionDataService: ElectionDataService,
    private electionService: ElectionService
  ) {
    const origin = this.electionDataService.getOrigin();
    if (origin && 'valid' === origin) {
      console.log(this.form5);
      this.form5 = this.electionDataService.getForm5();
      console.log(this.form5);
    } else {
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit() {
  }

  finish() {
    if(!this.form5.ballotVisibility || !this.form5.voterListVisibility){
      this.showNotification('danger', `Unable to create election! Following questions were unanswered ${(!this.form5.ballotVisibility)?"<br> - 'How secrete are the ballots?'":''}${(!this.form5.voterListVisibility)?"<br> - Who can see the list of voters?'":''}`);
      return;
    }

    this.isLoading = true;
    this.buttonStatus = 'Loading';
    this.electionDataService.setForm5(this.form5);
    if (this.electionDataService.getStatus() === 'edit' && this.electionDataService.getId()) {
      this.electionService.update(this.electionDataService.getId(), this.electionDataService.buildElectionData()).subscribe((data: any) => {
        this.electionDataService.purge();
        Swal({
          title: 'Done',
          text: 'Your election was successfully updated',
          type: 'success',
          confirmButtonColor: '#FFCD00',
          showCancelButton: true,
          confirmButtonText: 'Add Voters',
          cancelButtonText: 'Dashboard'
        }).then((result) => {
          if (result.value) {
            this.router.navigate(['election/' + this.electionDataService.getId() + '/voters']);
          } else {
            this.router.navigate(['dashboard']);
          }
        });
      },
        (err: HttpErrorResponse) => {
          if (err.status === 200) {
            this.electionDataService.purge();
            Swal({
              title: 'Done',
              text: 'Your election was successfully updated',
              type: 'success',
              confirmButtonColor: '#FFCD00',
              showCancelButton: true,
              confirmButtonText: 'Add Voters',
              cancelButtonText: 'Dashboard'
            }).then((result) => {
              this.electionDataService.purge();
              if (result.value) {
                this.router.navigate(['election/' + this.electionDataService.getId() + '/voters']);
              } else {
                this.router.navigate(['dashboard']);
              }
            });
          } else {
            this.showNotification('danger', 'Unable to update election! Please try again');
          }
        });
    } else if (this.electionDataService.getStatus() === 'create') {
      this.electionService.create(this.electionDataService.buildElectionData()).subscribe((data: any) => {
        this.showNotification('success', 'Your new election has successfully been created');
        this.electionDataService.purge();
        this.router.navigate(['dashboard']);
      }
        , (err: HttpErrorResponse) => {
          if (err.status === 200) {
            this.showNotification('success', 'Your new election has successfully been created');
            this.electionDataService.purge();
            this.router.navigate(['dashboard']);
          } else {
            this.isLoading = false;
            this.buttonStatus = 'Finish';
            this.showNotification('danger', 'Unable to create election! Please try again');
          }
        });
    } else {
      this.showNotification('danger', 'Something went wrong');
      this.electionDataService.purge();
      this.router.navigate(['dashboard']);
    }
  }

  isValid() {
    // Todo validate form
  }

  showNotification(notifType: string, message: string) {
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

  previous() {
    this.router.navigate(['../form4'], { relativeTo: this.route, skipLocationChange: true });
  }

  valid() {
    this.form5.ballotVisibility;
  }
}
