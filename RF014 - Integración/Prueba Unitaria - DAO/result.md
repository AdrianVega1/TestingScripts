FAIL  src/__tests__/page.test.jsx

Functional Suitability - uploadFilePoster and addActivity

    uploadFilePoster
        × should return false when file upload fails (2 ms)
        × should return false when the file exceeds the size limit
        √ should return true when file upload is successful (23 ms)
        × should return true when file upload is successful

    addActivity
        √ should return false when adding activity fails (13 ms)
        √ should return false when activity data is incomplete (missing 'nombre') (16 ms)
        √ should return true when activity is added successfully (1 ms)
        × should return true when activity is added successfully

Test Suites: 1 failed, 1 total

Tests:       4 failed, 4 passed, 8 total

Snapshots:   0 total

Time:        1.532 s

Ran all test suites.
