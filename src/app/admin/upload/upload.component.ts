import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { PersonaTipo, IUploadFile, Score, IScore, MediaTipo, CategoriaTipo } from '../../core/models';
import { OrcaState, From } from 'src/app/core/store';
import { Store } from '@ngrx/store';
import { MatStepper } from '@angular/material/stepper';

import { Observable, Subscription, of } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})

export class UploadComponent implements OnInit, OnDestroy {
  get generos() { return this.form.get('generos') as FormArray; }
  get gente() { return this.form.get('gente') as FormArray; }
  get video() { return this.form.get('youtube') as FormArray; }
  get grupos() { return this.form.get('grupos') as FormArray; }
  get media() { return this.form.get('media') as FormArray; }
  personas: string[] = Object.values(PersonaTipo);
  generosTodos: string[] = [];
  instrumentosTodos: string[] = [];
  gruposTodos: string[] = [];


  @ViewChild('generoInput') generoInput: ElementRef<HTMLInputElement>;
  @ViewChild('instrumentoInput') instrumentoInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('stepper') stepper: MatStepper;
  chipInputCtrl = new FormControl();
  gruposInputCtrl = new FormControl();
  chipInputCtrlI = new FormControl();

  files: IUploadFile[] = [];
  counter = 0;
  form: FormGroup;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  $loading: Observable<boolean> = of(false);
  subscriptions: Subscription = new Subscription();
  constructor(
    private _fb: FormBuilder,
    private store: Store<OrcaState>) {
  }
  show(files: IUploadFile[]) {
    console.log('admin/upload', files);
    console.log('admin/upload', this.form.value.media);
    this.addMedia(files.pop())
    // (<FormArray>this.form.controls['media']).push(new FormControl(files))
  }
  goBack(stepper: MatStepper) {
    stepper.previous();
  }
  canSave(stepper?: MatStepper) {
    return (stepper) ? stepper && stepper._steps && stepper.selectedIndex === (stepper._steps.length - 2) : false;
  }
  canPlay(stepper?: MatStepper) {
    return (stepper) ? stepper && stepper._steps && stepper.selectedIndex === (stepper._steps.length - 1) : false;

  }

  goForward(stepper: MatStepper) {
    stepper.next();
  }
  ngOnInit() {

    this.$loading = this.store.select(From.ui.getIsLoading);
    this.subscriptions.add(this.store.select(From.music.getGeneros).subscribe(val => this.generosTodos = val));
    this.subscriptions.add(this.store.select(From.music.getInstrumentos).subscribe(val => this.instrumentosTodos = val));
    this.subscriptions.add(this.store.select(From.music.getGrupos).subscribe(val => this.gruposTodos = val));
    this.form = this._fb.group({
      obra: ['', Validators.required],
      registro: [''],
      extrainfo: [''],
      generos: this._fb.array([]),
      grupos: [''],
      gente: this._fb.array([
        this.initPersona(),
      ]),
      youtube: this._fb.array([
        this.initVideo(),
      ]),
      media: this._fb.array([]),
    });
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  onSave(stepper?: MatStepper) {
    // const score: IScore = this.createScore()
    // this.store.dispatch(new From.music.SetPartitura(score));
    let yt: string[] = this.form.get('youtube').value.map(y => y.url);
    this.files = this.files.concat(yt.map((url) =>
      ({
        tipo: MediaTipo.YOUTUBE,
        archivo: new File(['foo', 'bar'], url),
      })
    ));
    this.newCateg(this.generosTodos, this.form.get('generos').value, CategoriaTipo.GENERO);
    this.parseInstruments();
    // console.log(score)
    // this.store.dispatch(new From.media.ManageMediaArray({ files: this.files }));
    stepper.next();
  }
  parseInstruments() {
    const instrArr = (<Array<{ instr: string[] }>>this.media.value)
      .reduce(
        (finalArray, media) => {
          return [
            ...finalArray, ...media.instr.filter(i => !(finalArray.includes(i)))
          ];
        }
        , []);
    this.newCateg(
      this.instrumentosTodos,
      instrArr,
      CategoriaTipo.INSTRUMENTOS
    );
  }

  newCateg(orig: string[], modified: string[], tipo: CategoriaTipo) {
    modified.filter(x => !orig.includes(x)).forEach(categoria => {
      console.log(`nuevo ${tipo} se debe agregar ${categoria}`);
      this.store.dispatch(new From.media.PostCateg({ tipo, categoria }));
    });
  }


  createScore() {
    return <IScore>{
      obra: this.form.get('obra').value,
      extrainfo: this.form.get('extrainfo').value,
      generos: this.form.get('generos').value,
      almacenamiento: this.form.get('almacenamiento').value,
      gente: this.form.get('gente').value,
    }
  }


  // -------------------------------PERSONA
  initPersona() {
    return this._fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: [''],
      tipo: ['']
    });
  }
  addPersona() { this.gente.push(this.initPersona()); }
  removePersona(i: number) { this.gente.removeAt(i); }

  // -------------------------------GENERO

  selectedGenero(event: MatAutocompleteSelectedEvent): void {
    this.addGeneroEvent(event.option.viewValue);
    this.generoInput.nativeElement.value = '';
    // this.genCtrl.setValue(null);
  }
  private addGeneroEvent(value: string) {
    const index = this.generos.value.findIndex((e: string) => e.trim() === value.trim());

    if (index === -1) {
      this.generos.value.push(value.trim());
    }
  }
  addChip(event: MatChipInputEvent): void {
    // if (!this.matAutocomplete.isOpen) {
    // console.log(this.generos);
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) { this.addGeneroEvent(value); }
    if (input) { input.value = ''; }
    // this.genCtrl.setValue(null);
    // }
  }
  removeChip(genero: string): void {
    const index = this.generos.value.indexOf(genero);
    if (index >= 0) {
      this.generos.value.splice(index, 1);
    }
  }
  // -------------------------------ALMACENAMIENTO
  initVideo() { return this._fb.group({ url: [''] }); }
  addVideo() { this.video.push(this.initVideo()); }
  removeVideo(i: number) { this.video.removeAt(i); }
  // -------------------------------MEDIA
  initMedia(u?: IUploadFile) {
    return this._fb.group({
      archivo: [u.archivo],
      tipo: [u.tipo],
      instr: [(u.instr) ? u.instr : ["guitarra", "teclado"]],
    });
  }
  addMedia(u?: IUploadFile) { (<FormArray>this.form.controls['media']).push(this.initMedia(u)); }
  removeMedia(i: number) {
    this.media.removeAt(i);
  }
  removeMediaInstr(instr: string, mediaIndex: number): void {
    const arr = this.form.get(['media', mediaIndex, 'instr']).value;
    const index = arr.indexOf(instr);
    if (index >= 0) {
      arr.splice(index, 1);
    }
  }
  addMediaInstr(event: MatChipInputEvent, mediaIndex: number): void {
    if ((event.value || '').trim()) { this.addInstrumentoEvent(event.value, mediaIndex); }
    if (event.input) { event.input.value = ''; }
    this.chipInputCtrlI.setValue(null);
  }
  selectedMediaInstr(event: MatAutocompleteSelectedEvent, i: number): void {
    this.addInstrumentoEvent(event.option.viewValue, i);
    // this.genCtrl.setValue(null);
  }
  private addInstrumentoEvent(instr: string, mediaIndex: number) {
    const index = this.form.get(['media', mediaIndex, 'instr']).value
      .findIndex((e: string) => e.trim() === instr.trim());

    if (index === -1) {
      this.form.get(['media', mediaIndex, 'instr']).value.push(instr.trim());
    }
  }

}
