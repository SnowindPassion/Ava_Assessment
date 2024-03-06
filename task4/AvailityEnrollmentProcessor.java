import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AvailityEnrollmentProcessor {

    public static void main(String[] args) {
        processCSV("task4/sample_file.csv");
    }

    public static void processCSV(String inputFile) {
        Map<String, List<AvailityEnrollmentRecord>> recordsByCompany = processCSVFile(inputFile);

        for (Map.Entry<String, List<AvailityEnrollmentRecord>> entry : recordsByCompany.entrySet()) {
            String company = entry.getKey();
            List<AvailityEnrollmentRecord> records = entry.getValue();
            processCompany(company, records);
        }

    }

    public static void processCompany(String company, List<AvailityEnrollmentRecord> records) {
        records.sort(Comparator.comparing(AvailityEnrollmentRecord::getLastName)
                .thenComparing(AvailityEnrollmentRecord::getFirstName));

        writeRecordsToCSV(company + "_enrollees.csv", records);
    }

    public static void writeRecordsToCSV(String outputFileName, List<AvailityEnrollmentRecord> records) {
        try (FileWriter fw = new FileWriter(outputFileName)) {
            fw.write("User Id,First Name,Last Name,Version\n");

            for (AvailityEnrollmentRecord record : records) {
                fw.write(record.getUserId() + "," + record.getFirstName() + "," +
                        record.getLastName() + "," + record.getVersion() + "\n");
            }

            System.out.println("Processed records and saved to " + outputFileName);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static Map<String, List<AvailityEnrollmentRecord>> processCSVFile(String inputFile) {
        Map<String, List<AvailityEnrollmentRecord>> recordsByCompany = new HashMap<>();
        try (BufferedReader br = new BufferedReader(new FileReader(inputFile))) {
            String line;
            boolean firstLine = true;
            while ((line = br.readLine()) != null) {
                if (firstLine) {
                    firstLine = false;
                    continue;
                }

                String[] data = line.split(",");
                String userId = data[0];
                String firstName = data[1];
                String lastName = data[2];

                int version = isInteger(data[3]) ? Integer.parseInt(data[3]) : 1;
                String insuranceCompany = data[4];

                recordsByCompany.putIfAbsent(insuranceCompany, new ArrayList<>());

                boolean userExists = false;
                for (int i = 0; i < recordsByCompany.get(insuranceCompany).size(); i++) {
                    AvailityEnrollmentRecord record = recordsByCompany.get(insuranceCompany).get(i);
                    if (record.getUserId().equals(userId)) {
                        userExists = true;
                        if (version > record.getVersion()) {
                            record = new AvailityEnrollmentRecord(userId, firstName, lastName, version);
                            recordsByCompany.get(insuranceCompany).set(i, record);
                        }
                        break;
                    }
                }

                if (!userExists) {
                    AvailityEnrollmentRecord record = new AvailityEnrollmentRecord(userId, firstName, lastName, version);
                    recordsByCompany.get(insuranceCompany).add(record);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return recordsByCompany;
    }

    public static boolean isInteger(String str) {
        try {
            Integer.parseInt(str);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }
}
