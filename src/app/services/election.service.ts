import { Injectable } from '@angular/core';
import { Election } from '../model/election.model';
import { BehaviorSubject, observable, Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { ElectionData } from '../model/electionData.model';
import { Voter } from '../model/voter.model';
import { Ballot } from '../model/ballot.model';
import { Winner } from '../model/winner.model';
import { BallotData } from '../model/ballotData.model';

@Injectable({
  providedIn: 'root'
})
export class ElectionService {
  private rootUrl = environment.API_URL;
  private currentElectionsSubject = new BehaviorSubject<Election[]>({} as Election[]);
  private currentElectionsReplaySubject = new ReplaySubject<Election[]>(1);
  public currentElections = this.currentElectionsSubject.asObservable().pipe(distinctUntilChanged());
  public currentElectionsObserve = this.currentElectionsReplaySubject.asObservable();

  constructor(private http: HttpClient) { }

  getheadersNoAuth() {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Token' : '',
      'No-Auth': 'True'
    };
    return headerDict;
  }

  getheadersWithAuth() {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
    };
    return headerDict;
  }


  getElections(): Observable<Election[]> {
    const reqHeaders = { headers: new HttpHeaders(this.getheadersWithAuth()) };
    return this.http.get<any>(this.rootUrl + '/election', reqHeaders).pipe(map(data => {
      const elections: Election[] = new Array();
      data.elections.map(value => elections.push(new Election().deserialize(value)));
      this.setElections(elections);
      return elections;
    }));
  }

  getElection(id: string) {
    const reqHeaders = { headers: new HttpHeaders(this.getheadersWithAuth()) };
    return this.http.get<Election>(this.rootUrl + '/election/' + id, reqHeaders).pipe(map(data => {
      return new Election().deserialize(data);
    }));
  }

  create(election: ElectionData) {
    const reqHeaders = { headers: new HttpHeaders(this.getheadersWithAuth()) };
    const body = JSON.stringify(election);
    return this.http.post(this.rootUrl + '/election', body, reqHeaders);
  }

  update(id: string, election: ElectionData) {
    const reqHeaders = { headers: new HttpHeaders(this.getheadersWithAuth()) };
    const body = JSON.stringify(election);
    return this.http.post(this.rootUrl + '/election/' + id, body, reqHeaders);
  }

  delete(id: string) {
    const reqHeaders = { headers: new HttpHeaders(this.getheadersWithAuth()) };
    return this.http.delete(this.rootUrl + '/election/' + id, reqHeaders);
  }

  getVoters(id: string) {
    const reqHeaders = { headers: new HttpHeaders(this.getheadersWithAuth()) };
    return this.http.get<Voter>(this.rootUrl + '/election/' + id + '/voters', reqHeaders);
  }

  addVoters(id: string, voters: Voter[]) {
    const reqHeaders = { headers: new HttpHeaders(this.getheadersWithAuth()) };
    const body = JSON.stringify(voters);
    return this.http.post(this.rootUrl + '/election/' + id + '/voters', body, reqHeaders);
  }

  addVoter(id: string, voter: Voter) {
    const reqHeaders = { headers: new HttpHeaders(this.getheadersWithAuth()) };
    const body = JSON.stringify(voter);
    return this.http.post(this.rootUrl + '/election/' + id + '/voter', body, reqHeaders);
  }

  getBallots(id: string) {
    const reqHeaders = { headers: new HttpHeaders(this.getheadersWithAuth())};
    return this.http.get<Ballot>(this.rootUrl + '/election/' + id + '/ballots', reqHeaders);
  }

  vote(id: string, ballot: BallotData) {
    const reqHeaders = { headers: new HttpHeaders(this.getheadersNoAuth())};
    const body = JSON.stringify(ballot);
    return this.http.post(this.rootUrl + '/vote/' + id, body, reqHeaders);
  }

  verifyVoter(id: string, pass: string): Observable<ElectionData> {
    const reqHeaders = { headers: new HttpHeaders(this.getheadersNoAuth())};
    return this.http.get<ElectionData>(this.rootUrl + '/voter/verify/' + encodeURIComponent(id) + '/' + encodeURIComponent(pass),
     reqHeaders).pipe(map(data => {
       return new ElectionData().deserialize(data);
     }));
  }

  getResults(id: string) {
    const reqHeaders = { headers: new HttpHeaders(this.getheadersWithAuth())};
    return this.http.get<Winner[]>(this.rootUrl + '/result/' + id , reqHeaders).pipe(map(data => {
      return data.map(value => new Winner().deserialize(value));
    }));
  }

  // Utility functions
   setElections(elections: Election[]) {
     this.currentElectionsSubject.next(elections);
     this.currentElectionsReplaySubject.next(elections);
   }

   removeElection(electionId: string) {
    const elections = this.currentElectionsSubject.value.
          filter((election) => !(election._id === electionId));
    this.setElections(elections);
   }

   purgeElections() {
     this.currentElectionsSubject.next({} as Election[]);
   }

   getCurrentElections(): Election[] {
     return this.currentElectionsSubject.value;
   }
}
