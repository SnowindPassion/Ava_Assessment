class EnrollmentRecord {
    private String userId;
    private String firstName;
    private String lastName;
    private int version;

    public EnrollmentRecord(String userId, String firstName, String lastName, int version) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.version = version;
    }

    public String getUserId() {
        return userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public int getVersion() {
        return version;
    }
}