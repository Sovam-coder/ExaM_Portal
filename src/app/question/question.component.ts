import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  public name : string="";
  public questionlist:any=[];
  public currentquestion:number=0;
  public point:number=0;
  public correctanswer:number=0;
  public wronganswer:number=0;
  public progress:string="0";
 isquizcompleted:boolean=false;
 public tpoint:number=0;
  counter=600;
  interval$:any;
  
  constructor(private questionservice:QuestionService) { }

  ngOnInit(): void {
    this.name=localStorage.getItem("name")!;
    this.getallquestions();
    this.startcounter();

    
  }
  
getallquestions()
{
  this.questionservice.getQuestionJson().subscribe(res=>{
    console.log(res.questions);
    this.questionlist=res.questions;
  })
}
nextquestion()
{
  this.currentquestion+=1;
}
answer(currentqno:number,option:any)
{
  if(currentqno===this.questionlist.length)
  {
    this.isquizcompleted=true;
    this.stopcounter();
  }
  if(option.correct)
  {
    this.point+=10;
    this.correctanswer+=1;
    setTimeout(()=>{
      this.currentquestion+=1;
      this.getprogresspercentage();
    },1000)
    
  }
  else{
    this.point-=2;
   
    setTimeout(()=>{
      this.wronganswer+=1;
      this.currentquestion+=1;
      this.getprogresspercentage();
    },1000)
    
    
  }
}
startcounter()
{
  this.interval$=interval(1000).subscribe(val=>{
    this.counter--
    if(this.counter===0)
    {
      // this.currentquestion+=1;
      this.isquizcompleted=true;
      this.counter=600;
      // this.point-=10;
    }
  })
  setTimeout(()=>{
this.interval$.unsubscribe()
  },60000)
}
stopcounter()
{
  this.interval$.unsubscribe()
  this.counter=0;
}
resetcounter()
{
  this.stopcounter();
  this.counter=600;
  this.startcounter();
}
getprogresspercentage()
{
  this.progress=(((this.currentquestion)*100)/(this.questionlist.length)).toString();
  return this.progress;
}

// createstudent=({
//   name: localStorage.getItem("name")!,
//   score: this.point
// })

// onSave()
// {
//   this.questionservice.createstudent(this.name,this.point).subscribe((result)=>{
    
//     // console.log(result)
    
    
//   })
// }
}


 


