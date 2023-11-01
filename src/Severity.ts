export type Severity = "F" | "E" | "W" | "I" | "D";
export type SeverityLong = "FATAL" | "ERROR" | "WARN " | "INFO " | "DEBUG";

export const severityLongStr = (severity: Severity): SeverityLong => {
    switch (severity) {
        case "D":
            return "DEBUG";
        case "E":
            return "ERROR";
        case "F":
            return "FATAL";
        case "I":
            return "INFO ";
        case "W":
            return "WARN ";
    }
    return "ERROR";
};

export type SeverityNum = number;

export const severityToNum = (severity: Severity): SeverityNum => {
    switch (severity) {
        case "D":
            return 1;
        case "I":
            return 2;
        case "W":
            return 3;
        case "E":
            return 4;
        case "F":
            return 5;
    }
};

export const severityFromNum = (severityNum: SeverityNum | undefined): Severity => {
    switch (severityNum) {
        case undefined:
        case 0:
        case 1:
            return "D";
        case 2:
            return "I";
        case 3:
            return "W";
        case 4:
            return "E";
        case 5:
            return "F";
    }
    return "F";
};
