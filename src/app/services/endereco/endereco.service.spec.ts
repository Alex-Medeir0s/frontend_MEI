import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EnderecoService } from './endereco.service';

describe('EnderecoService', () => {
  let service: EnderecoService;
  let httpMock: HttpTestingController;

  const apiUrl = 'http://localhost:8080';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EnderecoService],
    });

    service = TestBed.inject(EnderecoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve cadastrar dados com sucesso', () => {
    const mockData = { nome: 'Teste', telefone: '123456789', email: 'teste@example.com' };

    service.cadastrar(mockData).subscribe((response) => {
      expect(response).toEqual(mockData);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(mockData); 
  });

  it('deve consultar dados com sucesso', () => {
    const id = 1;
    const mockData = { id: 1, nome: 'Teste' };

    service.consultar(id).subscribe((response) => {
      expect(response).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${apiUrl}/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('deve remover dados com sucesso', () => {
    const id = 1;

    service.remover(id).subscribe((response) => {
      expect(response).toBeNull(); 
    });

    const req = httpMock.expectOne(`${apiUrl}/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null); 
  });

  it('deve atualizar dados com sucesso', () => {
    const mockData = { id: 1, nome: 'Teste Atualizado' };

    service.atualizar(mockData).subscribe((response) => {
      expect(response).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${apiUrl}/${mockData.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockData);
  });

  it('deve listar dados com sucesso', () => {
    const mockData = [{ id: 1, nome: 'Teste' }];

    service.listar().subscribe((response) => {
      expect(response).toEqual(mockData);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
