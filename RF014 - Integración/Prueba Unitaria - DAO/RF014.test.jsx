import { uploadFilePoster, addActivity } from "../app/DAO/daoActividad";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { collection, addDoc, getFirestore } from "firebase/firestore";

jest.mock("firebase/storage", () => ({
  getStorage: jest.fn(),
  ref: jest.fn(),
  uploadBytes: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
  getFirestore: jest.fn(),
}));

describe("Functional Suitability - uploadFilePoster and addActivity", () => {
  const mockFile = new File(["test"], "testfile.png", { type: "image/png" });
  const mockFileName = "testfile.png";
  const mockItID = "itinerary123";
  const mockActivityData = {
    nombre: "Visit Museum",
    descripcion: "A day at the museum",
    hora: "10:00 AM",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Helper function to test invalid data cases for uploadFilePoster.
   * @param {string} description - Test case description.
   * @param {Function} testFunction - The function being tested (uploadFilePoster).
   * @param {Object} file - The file used in the test case.
   * @param {string} fileName - The name of the file.
   */
  const testInvalidFileUpload = (description, testFunction, file, fileName) => {
    it(description, async () => {
      jest.mocked(uploadBytes).mockRejectedValue(new Error("Upload failed"));
      jest.mocked(getStorage).mockReturnValue("mockStorage");
      jest.mocked(ref).mockReturnValue("mockRef");

      const result = await testFunction(file, fileName);

      expect(result).toBe(false);
      expect(uploadBytes).toHaveBeenCalledTimes(1);
    });
  };

  /**
   * Helper function to test valid data cases for uploadFilePoster.
   * @param {Function} testFunction - The function being tested (uploadFilePoster).
   * @param {Object} file - The file used in the test case.
   * @param {string} fileName - The name of the file.
   * @param {boolean} expectedResult - The expected result of the function.
   */
  const testValidFileUpload = (
    testFunction,
    file,
    fileName,
    expectedResult
  ) => {
    it("should return true when file upload is successful", async () => {
      jest.mocked(uploadBytes).mockResolvedValue({
        ref: "mock-ref",
        bytesTransferred: 1000,
      });
      jest.mocked(getStorage).mockReturnValue("mockStorage");
      jest.mocked(ref).mockReturnValue("mockRef");

      const result = await testFunction(file, fileName);

      expect(result).toBe(expectedResult);
      expect(uploadBytes).toHaveBeenCalledTimes(1);
      expect(uploadBytes).toHaveBeenCalledWith("mockRef", file);
    });
  };

  // Test cases for uploadFilePoster
  describe("uploadFilePoster", () => {
    // Invalid data tests
    testInvalidFileUpload(
      "should return false when file upload fails",
      uploadFilePoster,
      mockFile,
      mockFileName
    );

    // New Invalid Data Test
    testInvalidFileUpload(
      "should return false when the file exceeds the size limit",
      uploadFilePoster,
      { ...mockFile, size: 100000000 }, // Mock a file size above the limit
      mockFileName
    );

    // Valid data tests
    testValidFileUpload(uploadFilePoster, mockFile, mockFileName, true);

    // New Valid Data Test
    testValidFileUpload(
      "should return true when uploading a valid image file",
      uploadFilePoster,
      { ...mockFile, type: "image/png" }, // Valid image file
      mockFileName,
      true
    );
  });

  /**
   * Helper function to test invalid data cases for addActivity.
   * @param {string} description - Test case description.
   * @param {Function} testFunction - The function being tested (addActivity).
   * @param {string} itineraryId - The itinerary ID.
   * @param {Object} activityData - The activity data.
   */
  const testInvalidActivityAdd = (
    description,
    testFunction,
    itineraryId,
    activityData
  ) => {
    it(description, async () => {
      jest.mocked(addDoc).mockRejectedValue(new Error("Add activity failed"));
      jest.mocked(collection).mockReturnValue("mockCollection");

      const result = await testFunction(itineraryId, activityData);

      expect(result).toBe(false);
      expect(addDoc).toHaveBeenCalledTimes(1);
    });
  };

  /**
   * Helper function to test valid data cases for addActivity.
   * @param {Function} testFunction - The function being tested (addActivity).
   * @param {string} itineraryId - The itinerary ID.
   * @param {Object} activityData - The activity data.
   * @param {boolean} expectedResult - The expected result of the function.
   */
  const testValidActivityAdd = (
    testFunction,
    itineraryId,
    activityData,
    expectedResult
  ) => {
    it("should return true when activity is added successfully", async () => {
      jest.mocked(addDoc).mockResolvedValue(true);
      jest.mocked(collection).mockReturnValue("mockCollection");

      const result = await testFunction(itineraryId, activityData);

      expect(result).toBe(expectedResult);
      expect(addDoc).toHaveBeenCalledTimes(1);
      expect(addDoc).toHaveBeenCalledWith("mockCollection", activityData);
    });
  };

  // Test cases for addActivity
  describe("addActivity", () => {
    // Invalid data tests
    testInvalidActivityAdd(
      "should return false when adding activity fails",
      addActivity,
      mockItID,
      mockActivityData
    );

    // New Invalid Data Test
    testInvalidActivityAdd(
      "should return false when activity data is incomplete (missing 'nombre')",
      addActivity,
      mockItID,
      { ...mockActivityData, nombre: "" } // Missing 'nombre'
    );

    // Valid data tests
    testValidActivityAdd(addActivity, mockItID, mockActivityData, true);

    // New Valid Data Test
    testValidActivityAdd(
      "should return true when adding an activity with all valid fields",
      addActivity,
      mockItID,
      { ...mockActivityData, hora: "18:00" }, // Modify 'hora' to a valid value
      true
    );
  });
});
