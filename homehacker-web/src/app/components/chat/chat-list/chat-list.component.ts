import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../../../shared/services/chat.service';
import { Message } from '../../../models/message.model';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from '../../../shared/services/session.service';
import { FormGroup } from '@angular/forms';
import { ApiError } from '../../../models/api-error.model';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  @ViewChild('form') form: FormGroup;
  message: Message = new Message();
  messages: Array<Message>;
  apiError: ApiError;
  meId: string;

  constructor(private chatService: ChatService, private route: ActivatedRoute, private sessionService: SessionService) { }
  
  ngOnInit(){
    this.meId = this.sessionService.user.id;

    this.message.from = this.meId;
    this.message.to = this.route.snapshot.paramMap.get('userId');
    
    this.chatService.list(this.message.to).subscribe((messages: Array<Message>) => {
      this.messages = messages;
      console.log(this.messages);
      
    },
    (error: ApiError) => {
      this.apiError = error;
    }
  )
}

onClickSubmitMessage(){
  if (this.form.valid) {
    this.chatService.sendMessage(this.message).subscribe((message: Message) => {
      console.log(message);
      
    },
    (error: ApiError) => {
      this.apiError = error;
    }
  )
}

}

}
