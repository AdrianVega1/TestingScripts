import { getNextActivity } from "../app/DAO/daoActividad";
import { collection, getDocs, getFirestore } from "firebase/firestore";

// Partially mock firebase/firestore and keep getFirestore intact
jest.mock("firebase/firestore", () => {
  const actualFirestore = jest.requireActual("firebase/firestore");
  return {
    ...actualFirestore, // Preserve real implementations
    collection: jest.fn(), // Mock collection
    getDocs: jest.fn(), // Mock getDocs
  };
});

describe("getNextActivity", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all activities when they exist in multiple itineraries", async () => {
    // Mocking Firestore data
    const mockActivity1 = {
      id: "1",
      nombre: "Activity 1",
      fecha: "2024-01-01",
    };
    const mockActivity2 = {
      id: "2",
      nombre: "Activity 2",
      fecha: "2024-01-02",
    };

    const mockItinerarySnapshot = {
      docs: [{ ref: "itineraryRef1" }, { ref: "itineraryRef2" }],
    };

    const mockActivitySnapshots = [
      { docs: [{ data: () => mockActivity1 }, { data: () => mockActivity2 }] },
      { docs: [{ data: () => mockActivity2 }] },
    ];

    // Mock Firestore behavior
    getDocs
      .mockResolvedValueOnce(mockItinerarySnapshot) // For itineraries
      .mockResolvedValueOnce(mockActivitySnapshots[0]) // Activities in itinerary 1
      .mockResolvedValueOnce(mockActivitySnapshots[1]); // Activities in itinerary 2

    collection.mockImplementation((_, path) => path);

    const activities = await getNextActivity();

    // Verify result
    expect(activities).toEqual([mockActivity1, mockActivity2, mockActivity2]);

    // Verify Firestore calls
    expect(collection).toHaveBeenCalledWith(expect.anything(), "itinerarios");
    expect(getDocs).toHaveBeenCalledTimes(3);
  });

  it("should return an empty array when no activities exist", async () => {
    const mockItinerarySnapshot = { docs: [] };

    // Mock Firestore behavior
    getDocs.mockResolvedValue(mockItinerarySnapshot);

    collection.mockImplementation((_, path) => path);

    const activities = await getNextActivity();

    // Verify result
    expect(activities).toEqual([]);

    // Verify Firestore calls
    expect(collection).toHaveBeenCalledWith(expect.anything(), "itinerarios");
    expect(getDocs).toHaveBeenCalledTimes(1);
  });
});
