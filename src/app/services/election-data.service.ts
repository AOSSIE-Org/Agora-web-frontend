import { Injectable } from '@angular/core';
import { Subject, ReplaySubject, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { ElectionFormOne } from '../model/election/election-form-one.model';
import { ElectionFormTwo } from '../model/election/election-form-two.model';
import { ElectionFormThree } from '../model/election/election-form-three.model';
import { ElectionFormFour } from '../model/election/election-form-four.model';
import { ElectionFormFive } from '../model/election/election-form-five.model';
import { ElectionData } from '../model/electionData.model';
import { Ballot } from '../model/ballot.model';
import { Election } from '../model/election.model';

@Injectable({
  providedIn: 'root'
})
export class ElectionDataService {

  private isValidElectionData = new ReplaySubject<boolean>(1);
  private originSource: string;
  private statusSource: string;

  private id: string;
  private form1 = new ElectionFormOne();
  private form2 = new ElectionFormTwo();
  private form3 = new ElectionFormThree();
  private form4 = new ElectionFormFour();
  private form5 = new ElectionFormFive();

  setOrigin(origin: string) {
    this.originSource = origin;
  }

  setStatus(status: string) {
    this.statusSource = status;
  }

  setId(id: string) {
    this.id = id;
  }

  setForm1(form1: ElectionFormOne) {
    this.form1 = form1;
  }

  setForm2(form2: ElectionFormTwo) {
    this.form2 = form2;
  }

  setForm3(form3: ElectionFormThree) {
    this.form3 = form3;
  }

  setForm4(form4: ElectionFormFour) {
    this.form4 = form4;
  }

  setForm5(form5: ElectionFormFive) {
    this.form5 = form5;
    this.isValidElectionData.next(true);
  }

  getId() {
    return this.id;
  }

  getForm1() {
    return this.form1;
  }

  getForm2() {
    return this.form2;
  }

  getForm3() {
    return this.form3;
  }

  getForm4() {
    return this.form4;
  }

  getForm5() {
    return this.form5;
  }

  getOrigin() {
    return this.originSource;
  }

  getStatus() {
    return this.statusSource;
  }

  purge() {
    this.form1 = new ElectionFormOne();
    this.form2 = new ElectionFormTwo();
    this.form3 = new ElectionFormThree();
    this.form4 = new ElectionFormFour();
    this.form5 = new ElectionFormFive();
    this.isValidElectionData.next(false);
  }

  buildElectionData() {
    const f1 = this.getForm1();
    const f2 = this.getForm2();
    const f3 = this.getForm3();
    const f4 = this.getForm4();
    const f5 = this.getForm5();

    const election = new ElectionData();
    election.name = f1.name;
    election.description = f1.description;
    election.startingDate = this.getDate(new Date(f2.startDate.toISOString()));
    election.endingDate = this.getDate(new Date(f2.endDate.toISOString()));
    election.candidates = f3.candidates;
    election.votingAlgo = f4.votingAlgo;
    election.ballotVisibility = f5.ballotVisibility;
    election.voterListVisibility = f5.voterListVisibility === 'true' ? true : false;
    election.isInvite = f5.isVoterInvite;
    election.isRealTime = f5.isRealtimeResult;
    return election;

  }

  buildElectionFormsData(election: Election) {
    // construct form1
    const form1 = new ElectionFormOne();
    form1.name = election.name;
    form1.description = election.description;

    // construct form2
    const form2 = new ElectionFormTwo();
    form2.endDate = new Date(election.end);
    form2.startDate = new Date(election.start);

    // construct form3
    const form3 = new ElectionFormThree();
    form3.candidates = election.candidates;

    // construct form4
    const form4 = new ElectionFormFour();
    form4.votingAlgo = election.votingAlgo;

    // construct form5
    const form5 = new ElectionFormFive();
    form5.ballotVisibility = election.ballotVisibility;
    form5.voterListVisibility = (election.voterListVisibility === true ? 'true' : 'false');
    form5.isVoterInvite = election.isInvite;
    form5.isRealtimeResult = election.realtimeResult;

    // set the values
    this.setId(election._id);
    this.setForm1(form1);
    this.setForm2(form2);
    this.setForm3(form3);
    this.setForm4(form4);
    this.setForm5(form5);

  }

  constructor() { }

  getDate(d: Date) {
    // Fist convert the date time to GMT 0
    const date = new Date(d.valueOf() + d.getTimezoneOffset() * 60000);
    const year = date.getFullYear(),
      month = (date.getMonth() + 1).toString(),
      formatedMonth = (month.length === 1) ? ('0' + month) : month,
      day = date.getDate().toString(),
      formatedDay = (day.length === 1) ? ('0' + day) : day,
      hour = date.getHours().toString(),
      formatedHour = (hour.length === 1) ? ('0' + hour) : hour,
      minute = date.getMinutes().toString(),
      formatedMinute = (minute.length === 1) ? ('0' + minute) : minute,
      second = date.getSeconds().toString(),
      formatedSecond = (second.length === 1) ? ('0' + second) : second;
    return year + '-' + formatedMonth + '-' + formatedDay + 'T' + formatedHour + ':' + formatedMinute + ':' + formatedSecond + 'Z';
  }
}
