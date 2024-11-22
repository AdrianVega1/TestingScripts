import { handlerUpdateUserController } from '../controller/studentsController';
import * as daoEstudiante from '../app/DAO/estudiantedao/daoEstudiante'; 
import EstudianteUsuario from '../model/EstudianteUsuario';

jest.mock('../model/EstudianteUsuario', () =>
  jest.fn().mockImplementation((carne, nombre, primerApellido, segundoApellido, correo, celular, sede, contrasena, rol, estado, fotoPerfil) => ({
    carne,
    nombre,
    primerApellido,
    segundoApellido,
    correo,
    celular,
    sede,
    contrasena,
    rol,
    estado,
    fotoPerfil,
  }))
);

jest.mock('../app/DAO/estudiantedao/daoEstudiante', () => ({
  updateUser: jest.fn(),
}));

describe('handlerUpdateUserController', () => {
  const mockId = '123';
  const mockLoadData = [
    {
      carne: '123',
      nombre: 'John',
      primerApellido: 'Doe',
      segundoApellido: 'Smith',
      correo: 'john.doe@example.com',
      sede: 'University',
      rol: 'Student',
      estado: 'Active',
    },
  ];

  const mockNewData = {
    cellphone: '987654321',
    password: 'newpassword',
    fotoPerfil: 'profilepic.jpg',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return true when update is successful', async () => {
    daoEstudiante.updateUser.mockResolvedValue(true);

    const result = await handlerUpdateUserController(mockId, mockNewData, mockLoadData);

    expect(result).toBe(true);
    expect(daoEstudiante.updateUser).toHaveBeenCalledTimes(1);

    
  });

  it('should return false if an error occurs during update', async () => {
    daoEstudiante.updateUser.mockRejectedValue(new Error('Update failed'));

    const result = await handlerUpdateUserController(mockId, mockNewData, mockLoadData);

    expect(result).toBe(false);
    expect(daoEstudiante.updateUser).toHaveBeenCalledTimes(1);
    
  });
});
