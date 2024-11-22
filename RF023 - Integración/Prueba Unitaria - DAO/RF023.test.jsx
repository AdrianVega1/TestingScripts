import { searchUserByEmail, searchStudentByEmail } from "../app/DAO/daoUsuario";
import { getDocs, query, collection } from "firebase/firestore";

jest.mock("firebase/firestore", () => {
  const originalModule = jest.requireActual("firebase/firestore");
  return {
    ...originalModule,
    getDocs: jest.fn(),
    query: jest.fn(),
    collection: jest.fn(),
  };
});

describe("searchUserByEmail and searchStudentByEmail - Dynamic Data Validation", () => {
  const mockUserEmail = "test@example.com";
  const mockStudentEmail = "student@example.com";

  const mockUserData = {
    correo: mockUserEmail,
    contrasena: "password123",
    rol: "Student",
    celular: "123456789",
  };

  const mockStudentData = {
    correo: mockStudentEmail,
    nombre: "John Doe",
    edad: 20,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Helper function to test invalid data cases for both functions.
   * @param {string} description - Test case description.
   * @param {Function} testFunction - The function being tested (searchUserByEmail or searchStudentByEmail).
   * @param {string} email - The email used in the test case.
   */
  const testInvalidData = (description, testFunction, email) => {
    it(description, async () => {
      getDocs.mockResolvedValue({
        forEach: () => {},
      });
      query.mockReturnValue({});
      collection.mockReturnValue({});

      const result = await testFunction(email);

      expect(result).toBeNull();
      expect(getDocs).toHaveBeenCalledTimes(1);
    });
  };

  /**
   * Helper function to test valid data cases for both functions.
   * @param {Function} testFunction - The function being tested (searchUserByEmail or searchStudentByEmail).
   * @param {Object} mockData - Mock data returned by getDocs.
   * @param {string} email - The email used in the test case.
   * @param {Object} expectedResult - The expected result of the function.
   */
  const testValidData = (testFunction, mockData, email, expectedResult) => {
    it("should return data when a record is found by email", async () => {
      getDocs.mockResolvedValue({
        forEach: (callback) => {
          callback({
            data: () => mockData,
            id: "record123",
          });
        },
      });
      query.mockReturnValue({});
      collection.mockReturnValue({});

      const result = await testFunction(email);

      expect(result).toEqual({ ...expectedResult, id: "record123" });
      expect(getDocs).toHaveBeenCalledTimes(1);
    });
  };

  // Test cases for searchUserByEmail
  describe("searchUserByEmail", () => {
    // Invalid data tests
    testInvalidData(
      "should return null when no user is found by email",
      searchUserByEmail,
      mockUserEmail
    );

    testInvalidData(
      "should return null when email is an empty string",
      searchUserByEmail,
      ""
    );

    testInvalidData(
      "should return null when email is undefined",
      searchUserByEmail,
      undefined
    );

    testInvalidData(
      "should return null when email is null",
      searchUserByEmail,
      null
    );

    // Valid data tests
    testValidData(searchUserByEmail, mockUserData, mockUserEmail, mockUserData);

    testValidData(
      searchUserByEmail,
      { ...mockUserData, rol: "Admin" },
      "admin@example.com",
      { ...mockUserData, rol: "Admin", correo: "admin@example.com" }
    );

    testValidData(
      searchUserByEmail,
      { ...mockUserData, celular: "987654321" },
      mockUserEmail,
      { ...mockUserData, celular: "987654321" }
    );
  });

  // Test cases for searchStudentByEmail
  describe("searchStudentByEmail", () => {
    // Invalid data tests
    testInvalidData(
      "should return null when no student is found by email",
      searchStudentByEmail,
      mockStudentEmail
    );

    testInvalidData(
      "should return null when email is an empty string",
      searchStudentByEmail,
      ""
    );

    testInvalidData(
      "should return null when email is undefined",
      searchStudentByEmail,
      undefined
    );

    testInvalidData(
      "should return null when email is null",
      searchStudentByEmail,
      null
    );

    testInvalidData(
      "should return null when email has invalid format (missing domain)",
      searchStudentByEmail,
      "student@"
    );

    testInvalidData(
      "should return null when email has invalid format (missing @)",
      searchStudentByEmail,
      "studentexample.com"
    );

    // Valid data tests
    testValidData(
      searchStudentByEmail,
      mockStudentData,
      mockStudentEmail,
      mockStudentData
    );

    testValidData(
      searchStudentByEmail,
      { ...mockStudentData, nombre: "Jane Doe" },
      "jane.doe@example.com",
      { ...mockStudentData, nombre: "Jane Doe", correo: "jane.doe@example.com" }
    );

    testValidData(
      searchStudentByEmail,
      { ...mockStudentData, edad: 22 },
      mockStudentEmail,
      { ...mockStudentData, edad: 22 }
    );
  });
});
