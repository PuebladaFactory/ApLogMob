import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AvatarService } from 'src/app/services/avatar.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  ngOnInit() {
  }
  profile = null;

  public segment: string = "list";
  public arr = new Array(25);

  constructor(
    private avatarService: AvatarService,
    private authService: AuthService,
    private imageService: ImageService,
    private router: Router,

  ) {
    this.avatarService.getUserProfile().subscribe((data) => {
      this.profile = data;
    });
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
    
  }

  async changeImage() {
    await this.imageService.changeAvatar();
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }
}
