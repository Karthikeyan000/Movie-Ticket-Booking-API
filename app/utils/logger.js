const { createLogger, transports, format } = require('winston');
const moment = require('moment');
const fs = require('fs');
const path = require('path');
const logsDirectory = 'logs';
const currentDate = moment().format('YYYY-MM-DD');


// Function to clean up logs
function cleanUpLogs() {
    const currentDate = moment().format('YYYY-MM-DD');
    const sevenDaysAgo = moment().subtract(7, 'days').format('YYYY-MM-DD');
    
    // Define the log directory
    const logDir = 'logs/';

    // Read the log files in the directory
    fs.readdir(logDir, (err, files) => {
        if (err) {
            console.error('Error reading log directory:', err);
            return;
        }

        // Iterate through the files
        files.forEach(file => {
            // Check if the file matches the log file pattern
            if (file.startsWith('error-') && file.endsWith('.log')) {
                // Extract the date from the file name
                const fileDate = file.split('-')[1].split('.')[0];

                // Check if the log file is older than 7 days
                if (moment(fileDate).isBefore(sevenDaysAgo)) {
                    // Delete the log file
                    fs.unlink(`${logDir}${file}`, err => {
                        if (err) {
                            console.error('Error deleting log file:', err);
                        } else {
                            console.log(`Deleted log file: ${file}`);
                        }
                    });
                }
            }
        });
    });
}

// 7 days in milliseconds
setInterval(cleanUpLogs, 7 * 24 * 60 * 60 * 1000); 

const errorLogger = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({
            filename: path.join(logsDirectory, `error-${currentDate}.log`),
            level: 'error',
            format: format.combine(
                format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }),
                format.printf(info => {
                    const logData = {
                        timestamp: info.timestamp,
                        level: info.level,
                        message: info.message,
                        error: info.stack,
                        data: info.data 
                    };
                    return JSON.stringify(logData, null, 2);
                })
            )
        })
    ]
});

const infoLogger = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({
            filename: path.join(logsDirectory, `info-${currentDate}.log`),
            level: 'info',
            format: format.combine(
                format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }),
                format.printf(info => {
                    const logData = {
                        timestamp: info.timestamp,
                        level: info.level,
                        message: info.message,
                        data: info.data 
                    };
                    return JSON.stringify(logData, null, 2);
                })
            )
        })
    ]
});

module.exports = {
    errorLogger,
    infoLogger
};