import { render, fireEvent, screen } from '@testing-library/react';
import Page from '../app/newActivity/page';
import { handlerAddActivity } from '../controller/actividadController';
import 'fake-indexeddb/auto';


jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
        back: jest.fn(),
        forward: jest.fn(),
        asPath: '/',
        query: {},
        pathname: '/',
    }),
}));

jest.mock('../controller/actividadController', () => ({
    handlerAddActivity: jest.fn().mockResolvedValue({ success: true }), 
}));

beforeAll(() => {
    // Mock the dialog element
    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();
});

describe('handleSubmit Integration Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });

    it('should render the page without crashing', () => {
        const { getByText } = render(<Page />);
        expect(getByText('Crear actividad')).toBeInTheDocument();
    });

    it('should add an activity successfully when valid data is provided', () => {
        render(<Page />);

        // Simulate user inputs
        fireEvent.change(screen.getByLabelText('Nombre'), {
            target: { value: 'Nueva Actividad' },
        });

        fireEvent.change(screen.getByLabelText('Semana de realizacion'), {
            target: { value: 'Semana 1' },
        });

        fireEvent.change(screen.getByLabelText('Tipo'), {
            target: { value: 'Orientadora' },
        });

        fireEvent.change(screen.getByLabelText('Modalidad'), {
            target: { value: 'Presencial' },
        });

        fireEvent.change(screen.getByLabelText('Fecha'), {
            target: { value: '11/30/2024' },
        });

        fireEvent.change(screen.getByLabelText('Hora'), {
            target: { value: '10:12 AM' },
        });

        fireEvent.change(screen.getByLabelText('Iniciar recordatorio'), {
            target: { value: '11/25/2024' },
        });

        fireEvent.change(screen.getByLabelText('Enlace'), {
            target: { value: 'https://example.com' },
        });

        fireEvent.change(screen.getByLabelText('Frecuencia de recordatorios'), {
            target: { value: '1' },
        });

        // Simulate file upload for "Afiche"
        const file = new File(['dummy content'], 'afiche.png', { type: 'image/png' });
        fireEvent.change(screen.getByLabelText('Afiche'), {
            target: { files: [file] },
        });

        // Simulate form submission
        fireEvent.click(screen.getByText('Crear actividad'));

        // Expect handlerAddActivity to be called with appropriate arguments
        expect(handlerAddActivity).toHaveBeenCalled();
    });

    it('should not add an activity when invalid data is provided', () => {
        render(<Page />);

        // Simulate user inputs with invalid data
        fireEvent.change(screen.getByLabelText('Nombre'), {
            target: { value: '' }, // Empty name
        });

        // Simulate form submission
        fireEvent.click(screen.getByText('Crear actividad'));

        // Expect handlerAddActivity not to be called due to validation failure
        expect(handlerAddActivity).not.toHaveBeenCalled();
    });
});
