import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { handleSubmit } from './YourComponent'; // Import the function if it's exported or test the component that contains it
import '@testing-library/jest-dom/extend-expect'; // for expect extensions
import { useRouter } from 'next/router'; // Assuming this is used based on the code

// Mocking localStorage, router, and other external services
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('./IndexedDBService', () => ({
  IndexedDBService: jest.fn().mockImplementation(() => ({
    deleteFile: jest.fn(),
  })),
}));

describe('handleSubmit', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show error if no professors are selected', async () => {
    localStorage.getItem.mockReturnValueOnce('[]'); // Simulate empty chosenProfessors

    const mockChangeTitlePopUp = jest.fn();
    const mockChangeContentPopUp = jest.fn();
    const mockOpenDialog = jest.fn();
    const mockHandlerAddActivity = jest.fn();

    // Simulate form submission
    const e = { preventDefault: jest.fn() }; // No need for TypeScript assertion
    await handleSubmit(e);

    expect(mockChangeTitlePopUp).toHaveBeenCalledWith('Error');
    expect(mockChangeContentPopUp).toHaveBeenCalledWith(
      'No se han seleccionado encargados, por favor seleccione al menos uno.'
    );
    expect(mockOpenDialog).toHaveBeenCalled();
  });

  it('should add activity when professors are selected and conditions are met', async () => {
    localStorage.getItem.mockReturnValueOnce(JSON.stringify([{ id: 1, name: 'Professor A' }])); // Mock selected professors
    localStorage.getItem.mockReturnValueOnce('someItinerarioId'); // Mock itinerarioId

    const mockChangeTitlePopUp = jest.fn();
    const mockChangeContentPopUp = jest.fn();
    const mockOpenDialog = jest.fn();
    const mockHandlerAddActivity = jest.fn();

    const e = { preventDefault: jest.fn() }; // No need for TypeScript assertion

    const mockActividad = {
      nombre: 'Test Activity',
      semanaRealizacion: 'Week 1',
      tipo: 'Test',
      modalidad: 'In-person',
      fecha: '2024-11-25',
      hora: '10:00',
      iniciarRecordatorio: true,
      enlace: 'http://example.com',
      afiche: 'afiche.jpg',
      encargados: [{ id: 1, name: 'Professor A' }],
      estado: 'Planeada',
      frecuencia: 'Weekly',
    };

    // Simulate form submit
    await handleSubmit(e);

    expect(mockHandlerAddActivity).toHaveBeenCalledWith(
      mockActividad,
      'someItinerarioId',
      expect.anything(), // Expect the file object here, you can pass a mock if needed
      'afiche.jpg',
      expect.anything(), // Mock the router here if needed
      mockOpenDialog
    );

    expect(localStorage.setItem).toHaveBeenCalledWith('actividad', JSON.stringify({}));
    expect(mockChangeTitlePopUp).not.toHaveBeenCalled();
    expect(mockChangeContentPopUp).not.toHaveBeenCalled();
  });

  it('should handle missing itinerarioId or file', async () => {
    localStorage.getItem.mockReturnValueOnce(JSON.stringify([{ id: 1, name: 'Professor A' }]));
    localStorage.getItem.mockReturnValueOnce(null); // Missing itinerarioId

    const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();

    const e = { preventDefault: jest.fn() }; // No need for TypeScript assertion
    await handleSubmit(e);

    expect(mockConsoleError).toHaveBeenCalledWith("No 'itinerarioId' in localStorage");
  });

  it('should delete the file from IndexedDB after submission', async () => {
    const mockDeleteFile = jest.fn();
    const { IndexedDBService } = require('./IndexedDBService');
    IndexedDBService.mockImplementationOnce(() => ({
      deleteFile: mockDeleteFile,
    }));

    localStorage.getItem.mockReturnValueOnce(JSON.stringify([{ id: 1, name: 'Professor A' }]));
    localStorage.getItem.mockReturnValueOnce('someItinerarioId');

    const e = { preventDefault: jest.fn() }; // No need for TypeScript assertion

    await handleSubmit(e);

    await waitFor(() => {
      expect(mockDeleteFile).toHaveBeenCalled();
    });
  });
});
