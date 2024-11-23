FAIL  src/__tests__/page.test.jsx

searchUserByEmail and searchStudentByEmail - Dynamic Data Validation

    searchUserByEmail

        √ should return null when no user is found by email (2 ms)
        √ should return null when email is an empty string (1 ms)
        √ should return null when email is undefined (1 ms)
        √ should return null when email is null
        √ should return data when a record is found by email (2 ms)
        × should return data when a record is found by email (4 ms)
        √ should return data when a record is found by email

    searchStudentByEmail

        √ should return null when no student is found by email (4 ms)
        √ should return null when email is an empty string
        √ should return null when email is undefined (1 ms)
        √ should return null when email is null (1 ms)
        √ should return null when email has invalid format (missing domain)
        √ should return null when email has invalid format (missing @)
        √ should return data when a record is found by email
        × should return data when a record is found by email (1 ms)
        √ should return data when a record is found by email

Test Suites: 1 failed, 1 total

Tests:       2 failed, 14 passed, 16 total

Snapshots:   0 total

Time:        1.146 s

Ran all test suites.
