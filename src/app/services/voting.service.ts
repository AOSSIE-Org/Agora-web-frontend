import { Injectable } from '@angular/core';
import { ElectionData } from '../model/electionData.model';

@Injectable({
  providedIn: 'root'
})
export class VotingService {

  private voterID: string;
  private voterCode: string;
  private originSource: string;
  private electionData: ElectionData = new ElectionData();

  constructor() { }

  setOrigin(origin: string) {
    this.originSource = origin;
  }

  getOrigin() {
    return this.originSource;
  }

  setVoterID(id: string) {
    this.voterID = id;
  }

  getVoterID() {
    return this.voterID;
  }

  setVoterCode(code: string) {
    this.voterCode = code;
  }

  getVoterCode() {
    return this.voterCode;
  }

  setData(data: ElectionData) {
    this.electionData = data;
  }

  getData() {
    return this.electionData;
  }

  purge() {
    this.setOrigin('');
    this.electionData = null;
  }

}
