import { handlerUpdateUserController } from "../controller/studentsController";
import * as daoEstudiante from "../app/DAO/estudiantedao/daoEstudiante";
import EstudianteUsuario from "../model/EstudianteUsuario";

jest.mock("../model/EstudianteUsuario", () =>
  jest
    .fn()
    .mockImplementation(
      (
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
        fotoPerfil
      ) => ({
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
      })
    )
);

jest.mock("../app/DAO/estudiantedao/daoEstudiante", () => ({
  updateUser: jest.fn(),
}));

describe("handlerUpdateUserController - Dynamic Data Validation", () => {
  const mockId = "123";

  const mockLoadData = [
    {
      carne: "123",
      nombre: "John",
      primerApellido: "Doe",
      segundoApellido: "Smith",
      correo: "john.doe@example.com",
      celular: "123456789",
      sede: "University",
      rol: "Student",
      estado: "Active",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Helper function to test invalid data cases
   * @param {string} description - Test case description
   * @param {Object} invalidData - Data to pass to the controller
   */
  const testInvalidData = (description, invalidData) => {
    it(description, async () => {
      const result = await handlerUpdateUserController(
        mockId,
        invalidData,
        mockLoadData
      );

      expect(result).toBe(false);
      expect(daoEstudiante.updateUser).not.toHaveBeenCalled();
    });
  };

  /**
   * Helper function to test valid data cases
   * @param {Object} validData - Data to pass to the controller
   */
  const testValidData = (validData) => {
    it("should return true for valid input data", async () => {
      daoEstudiante.updateUser.mockResolvedValue(true);

      const result = await handlerUpdateUserController(
        mockId,
        validData,
        mockLoadData
      );

      expect(result).toBe(true);
      expect(daoEstudiante.updateUser).toHaveBeenCalledTimes(1);
    });
  };

  // Test cases for invalid data
  testInvalidData("should return false if email is invalid (missing @)", {
    ...mockLoadData[0],
    correo: "johndoeexample.com",
  });

  testInvalidData("should return false if email domain is invalid", {
    ...mockLoadData[0],
    correo: "john.doe@invalid",
  });

  testInvalidData("should return false if carne (ID) is not numeric", {
    ...mockLoadData[0],
    carne: "ABC123",
  });

  testInvalidData(
    "should return false if phone number contains non-numeric characters",
    {
      ...mockLoadData[0],
      celular: "98765abcd",
    }
  );

  // Test case for valid data
  testValidData({
    ...mockLoadData[0],
    correo: "valid.email@example.com",
    celular: "987654321",
  });
});
