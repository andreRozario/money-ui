import { Component, OnInit } from '@angular/core';

import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { MessageService } from 'primeng/api';

import { CategoryService } from 'src/app/category/category.service';
import { EntryService } from '../entry.service';
import { PersonService } from 'src/app/person/person.service';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';

import { Entry } from 'src/app/_model/entry';
import { EntryType } from 'src/app/_model/enumeration/entry-type';

@Component({
  selector: 'app-entry-create',
  templateUrl: './entry-create.component.html',
  styleUrls: ['./entry-create.component.css']
})
export class EntryCreateComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  types: any[] = [];

  categories: any[] = [];

  persons: any[] = [];

  uploading = false;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private entryService: EntryService,
    private personService: PersonService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit(): void {

    this.initVariables();
  }

  loadEntry(id: number) {

    this.entryService.findById(id).then((entry: Entry) => {

      this.form.patchValue(entry);

      this.titleUpdate();

    }).catch(error => this.errorHandler.handle(error));
  }

  get isEditing() {

    return Boolean(this.form.get('id')!.value);
  }

  get f(): { [key: string]: AbstractControl } {

    return this.form.controls;
  }

  get uploadHeaders() {

    return this.entryService.uploadHeaders();
  }

  get uploadURL() {

    return this.entryService.uploadURL();
  }

  get fileName() {

    const fileName = this.f['attachment']?.value;

    if (fileName)

      return fileName.substring(fileName.indexOf('_') + 2, fileName.length);

    return null;
  }

  onSubmit() {

    if (this.isEditing)

      this.update();

    else

      this.save();
  }

  reset() {

    this.form.reset({ type: 'RECEITA' });
  }

  save() {

    const entry = this.form.value;

    this.entryService.save(entry).then((entry: Entry) => {

      this.messageService.add({ severity:'success', summary: 'Sucesso', detail: 'Lançamento salvo na base de dados!', icon: 'pi-check-circle' });

      this.router.navigate(['/entries/edit', entry.id]);

    }).catch(error => this.errorHandler.handle(error));
  }

  update() {

    const entry = this.form.value;

    this.entryService.update(entry).then((entry: Entry) => {

      this.form.patchValue(entry);

      this.titleUpdate();

      this.messageService.add({ severity:'success', summary: 'Sucesso', detail: 'Lançamento alterado na base de dados!', icon: 'pi-check-circle' });

    }).catch(error => this.errorHandler.handle(error));
  }

  loadCategories() {

    return this.categoryService.findAll().then(categories => {

      this.categories = categories.map((c: { name: string; id: number; }) => ({ label: c.name, value: c.id }));

    }).catch(error => this.errorHandler.handle(error));
  }

  loadPersons() {

    return this.personService.findAll().then(persons => {

      this.persons = persons.map((p: { name: string; id: number; }) => ({ label: p.name, value: p.id }));

    }).catch(error => this.errorHandler.handle(error));
  }

  new() {

    this.reset();

    this.router.navigate(['entries/create']);
  }

  onBeforeUpload() {

    this.uploading = true;
  }

  onUpload(event: any) {

    const attachment = event.originalEvent.body;

    this.form.patchValue({
      attachment: attachment.filename,
      urlAttachment: this.buildFileURI(attachment.url as string)
    });

    this.uploading = false;
  }

  onError(_event: any) {

    this.messageService.add({ severity:'error', summary: 'Atenção!', detail: 'Erro ao tentar enviar anexo!', icon: 'pi-exclamation-circle' });

    this.uploading = false;
  }

  removeAttachement() {

    this.form.patchValue({
      attachment: null,
      urlAttachment: null
    });
  }

  buildFileURI(url: string) {

    return url.startsWith('https://') ? url : url.replace('\\', 'https://');
  }

  private titleUpdate() {

    this.title.setTitle(`Editar Lançamento: ${ this.form.get('description')?.value }`);
  }

  private loadEnumerations() {

    this.types = Object.keys(EntryType).map(key => ({ label: EntryType[key as keyof typeof EntryType], value: key }));
  }

  private initVariables() {

    this.title.setTitle('Novo Lançamento');

    const id = this.route.snapshot.params['id'];

    this.initForm();

    this.loadEnumerations();

    this.loadCategories();

    this.loadPersons();

    if (id)

      this.loadEntry(id);
  }

  private initForm() {

    this.form = this.formBuilder.group({
      id: [],
      type: [ 'RECEITA', null ],
      dueDate: [ null, Validators.required ],
      paymentDate: [],
      description: [ null, [ Validators.required, Validators.minLength(5) ] ],
      value: [ null, Validators.required ],
      category: this.formBuilder.group({
        id: [ null, Validators.required ]
      }),
      person: this.formBuilder.group({
        id: [ null, Validators.required ]
      }),
      observation: [],
      attachment: [],
      urlAttachment: []
    });
  }
}
