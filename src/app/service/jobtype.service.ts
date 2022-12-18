import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobtypesService {
  http:any;
  baseApiUrl=environment.baseUrl;
  baseUrl:string | undefined;
  

  constructor(private Http:HttpClient) {
    
   }
   getJobType(){
    return this.Http.get<any>(this.baseApiUrl+"api/MasterData/GetJobType")
   }
   getReferedEmployee(){
    return this.Http.get<any>(this.baseApiUrl+"api/MasterData/GetEmployeeDetails")
   }
   addCandidate(body:any){
    return this.Http.post<any>(this.baseApiUrl+"api/Candidate/CreateCandidate",body,{observe:'response'});
   }
   getSkill(){
    return this.Http.get<any>(this.baseApiUrl+"api/MasterData/GetSkill")
  }  
  addSkill(skillData:any){
    return this.Http.post<any>(this.baseApiUrl+"api/MasterData/AddNewSkill",skillData)
  }

  getAllCandidateList(paginationDetails:any)
  {
    return this.Http.post<any>(this.baseApiUrl+"api/Candidate/GetAllCandidateDetails",paginationDetails);
  }

  public getCandidateResumeFile(candiateResumeId:number):Observable<ArrayBuffer>
  {
    return this.Http.get<any>(this.baseApiUrl+"api/Candidate/DownloadResume?candidateResumeId="+candiateResumeId, { observe: 'response' as 'body', responseType : 'blob' as 'json'});
  }

  getBybCandidateDetailsTotalPageCount()
  {
    return this.Http.get<any>(this.baseApiUrl+"api/Candidate/GetBYBCandidateDetailsTotalPageCount");
  }
  getNoOfWorkType(){
    return this.Http.get<any>(this.baseApiUrl+"api/MasterData/GetNoOfWorkType")
  }  
  getFilterCandidateData(filterData:any){
    return this.Http.post<any>(this.baseApiUrl+"api/Candidate/GetFilteredCandidateDetails",filterData);

  }

  getNoOfPreferredJobType(){
    return this.Http.get<any>(this.baseApiUrl+"api/MasterData/GetNoOfPreferredJobTypes")
  }  
  getStatusType(){
    return this.Http.get<any>(this.baseApiUrl+"api/MasterData/GetStatusType")
  }
  getJobVacncyData(){
    return this.Http.get<any>(this.baseApiUrl+"api/MasterData/GetJobVacancies")
  }
  addJobVacancyData(jobPositionData:any){
    return this.Http.post<any>(this.baseApiUrl+"api/MasterData/AddNewJobVacancy",jobPositionData)

  }
  deleteJobVacancyData(JobId:Number){
    return this.Http.post<any>(this.baseApiUrl+"api/MasterData/DeleteJobVacancy",JobId)
  }
  addNewCandidate(body:any){
    return this.Http.post<any>(this.baseApiUrl+"api/Candidate/CreateNewCandidate",body,{observe:'response'});
   }
   getCandidatePersonalInfo(candidateId:any){
    return this.Http.post<any>(this.baseApiUrl+"api/Candidate/GetCandidatePersonalInfoByCandidateId",candidateId)
   }
   sendEmail(candidadateMailList:any){
    return this.Http.post<any>(this.baseApiUrl+"api/MasterData/SendEmail",candidadateMailList);

}
getAllCandidateInformation(paginationDetails:any)
  {
    return this.Http.post<any>(this.baseApiUrl+"api/Candidate/GetAllCandidateInformations",paginationDetails);
  }
  getFilterCandidateInfoData(filterData:any){
    return this.Http.post<any>(this.baseApiUrl+"api/Candidate/GetFilteredCandidateInformation",filterData);

  }
  getCandidateInformationTotalPageCount()
  {
    return this.Http.get<any>(this.baseApiUrl+"api/Candidate/GetCandidateDetailsInfoTotalPageCount");
  }
  isEmailValid(emailId:any){
    return this.Http.get<any>(this.baseApiUrl+"api/Candidate/IsEmailIdValid?emailId="+emailId)
  }

  sendAcknowledgeToAll(){
    return this.Http.get<any>(this.baseApiUrl+"api/Candidate/SendAcknowledgeToAll")
  }

}