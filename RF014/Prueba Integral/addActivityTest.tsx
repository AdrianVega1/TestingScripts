import { render, fireEvent, screen } from '@testing-library/react';
import Page from '../app/newActivity/page'; 
import { handlerAddActivity } from '../controller/actividadController';

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
    handlerAddActivity: jest.fn(),
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
            target: { value: 'Actividad 1' },
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
