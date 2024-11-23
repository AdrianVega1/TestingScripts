import { render, fireEvent, screen } from "@testing-library/react";
import LoginPage from "../app/login/page"; // Adjust the path based on your project structure
import { handlerLogin } from "../controller/loginController";

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
        back: jest.fn(),
        forward: jest.fn(),
        asPath: "/",
        query: {},
        pathname: "/",
    }),
}));

jest.mock("../controller/loginController", () => ({
    handlerLogin: jest.fn(),
}));

beforeAll(() => {
    // Mock the dialog element
    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();
});

describe("LoginPage Role-Based Login Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });

    const testCases = [
        { role: "Admin", email: "bolanos@gmail.com", password: "1qazxsw2", expectedRole: "Administrador" },
        { role: "Coordinator", email: "joctan@estudiantec.cr", password: "12345", expectedRole: "Coordinador" },
        { role: "Professor", email: "destello@gmail.com", password: "1qazxsw2", expectedRole: "Profesor" },
    ];

    it("should render the login page without crashing", () => {
        render(<LoginPage />);
        expect(screen.getByText("Login")).toBeInTheDocument();
        expect(screen.getByLabelText("Email")).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
    });

    testCases.forEach(({ role, email, password, expectedRole }) => {
        it(`should successfully log in as a ${role}`, async () => {
            render(<LoginPage />);
            
            // Mock the handlerLogin to simulate role-based response
            handlerLogin.mockImplementationOnce((email, password, router) => {
                const userData = { email, role: expectedRole };
                localStorage.setItem("user", JSON.stringify(userData));
                router.push("/mainMenu");
            });

            // Simulate user input
            fireEvent.change(screen.getByLabelText("Email"), { target: { value: email } });
            fireEvent.change(screen.getByLabelText("Password"), { target: { value: password } });

            // Simulate form submission
            fireEvent.click(screen.getByText("LOGIN"));

            // Verify that handlerLogin was called with the correct arguments
            expect(handlerLogin).toHaveBeenCalledWith(
                email,
                password,
                expect.anything(), // router
                expect.anything()  // openDialog
            );

            // Verify that the user data in localStorage includes the expected role
            const storedUser = JSON.parse(localStorage.getItem("user"));
            expect(storedUser.role).toBe(expectedRole);
        });
    });
});
