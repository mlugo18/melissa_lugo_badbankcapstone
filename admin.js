//USED FOR LOG IN AUTHENTICATION BY INDEX.JS 5.6


const admin = require('firebase-admin');

//key
const type = "service_account";
const project_id = "badbankapp-8798e";
const private_key_id = "ed7eb9861b8afe904106076fdcc0b3fd7a6fd3ed";
const private_key = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC6+8pxRgQItz5s\n1fIA5Cq0lFYXGmnw0tnBQOFhYxjjGjgQjKSXbdAyR6et3Y8HVItUyM19+GLzfHW2\niWSypkctC3xUDAQcLQTxnPi+ZvaliFQpgomRf1zkXgdkKih8okG2L3l0ceFerV8i\nWyRtHP2FP8jOCUc4yy2ABEt17l9pjeC0YUAcNASxuzNA2CrP3PD2HZ7xq03SnIfW\ng2lRt8hmtkobpuP2VDEg2zRjLG8XvmnLb53OvoBkd4ug8vj0gq7DF+YyroY2ZuGO\no3pLB8G/WFs33lnZahJH8ZawtcK4/ViPCcYCXEEYM0AQYynZlctrwKy0tKXAxYy1\n2koGaxldAgMBAAECggEAGJ14B5RriIgzABnkG2juFEqo0K7J/omLYAz9/peQmakE\nc21IZ6TtsQjM0q8lmpXvJ7CtmKU/xYT/bBHHP1tzaEMoUVopmln02ifLeSlN0/nP\n9oz4Nj65iFi2iWGhZdLoaqbySrmJLTEOopO0Bmc4GrgMY89F4Hyi10T5eCNyzQ7F\nztarjYspAtiuPkgT13VSiyp0XGbrv7JNUT2maOjxk2FpF81LQNXpOalxbUEuoAz/\n9fRW0R/cQnFgD6mHM8aghewU/AoiboZloi3U72OaguBs2yOUWktOj2JqY86uXGu8\ngmsP7isTE7iccSPBQydBDoAg6LiLMbtiCBQ0ed+6EwKBgQD4yiIaO/N6cvSyfpSI\n0rwJ7pO+j4GqpGe9/0o2arrXccwo9z4B3haTaeaV4cDxSV6vomO+Owhnr7aQmW5z\nhUMZ1+IltskAX0PNaoFpkWrthmZAQexGgIOW5KillOoupQjM3PcIBe0DidMIjYtZ\ncl/HbBtxZc7M+wvT5Io4qot+gwKBgQDAZxg4hNMbItkLr9fE9PLo8ZS4lPu+jMk1\nzZSwkFVs3BQ8UORojVLf6XfUHjTaXN9oae5uHDbz+i8BnZV/eefnv4765AsxZwJv\nJQY22QUWI/+wPdCAVpxdP+p8Zlht14JlvWQjcc3fsW2rIztxTiq4DxlundQH6fQQ\nsay/mAOCnwKBgQDgMq/Gum3w0/VlgSJzpoyj2qaz3Hj6gQuoMY38OfREQJ298Qil\nADGSCKYuPXH1PqwgVJPUEzjAz50S8+GQIvBUMrLuT6kVN8RPMgKLUutsP2iX0ZCN\n/DQZX9gG14quHDUxAJNxXH25aZOOqpeANMzRVr/oUdmp6TZAbjyNUktA5wKBgQCy\nV92vpg84vBiMKLbMrnDrU+MTJaYkfsOTx7fn4iINAgMP1bui3jzPqM2WJVnAfw3m\n7yo/jo+xn1orGTMWMp2vx3R1QyTM6jrrY1pbRNbeKwg7CVFXZPETzsdAAG4/guAw\nBlnoMPkwPHr3g3T6FgarDfP5APslSssdHlSOVA4M6QKBgB8hqX/nm2wjozuOBq3f\nJfrJRqRkj8rTeWtVcfDLYGYvWDTI8azzcUyMDmrGTxnlzlKBvv8tfl3cMZRk0hLo\nyiLaJbyVWITWTQLcTfrcAJ6CDb/n9RZSVsaWHaE858zWU0i47HddgzSrphiiff/5\nQf7udWIGCFt4/aJFDkDwclYd\n-----END PRIVATE KEY-----\n";
const client_email = "firebase-adminsdk-3izrg@badbankapp-8798e.iam.gserviceaccount.com";
const client_id = "112140569262762715388";
const auth_uri = "https://accounts.google.com/o/oauth2/auth";
const token_uri = "https://oauth2.googleapis.com/token";
const auth_provider_x509_cert_url = "https://www.googleapis.com/oauth2/v1/certs";
const client_x509_cert_url = "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-3izrg%40badbankapp-8798e.iam.gserviceaccount.com";
const universe_domain = "googleapis.com";

//credential grants access to firebase services
admin.initializeApp({
  credential: admin.credential.cert({
    type,
    project_id,
    private_key_id,
    private_key:
      private_key.replace(/\\n/g, '\n'),
    client_email,
    client_id,
    auth_uri,
    token_uri,
    auth_provider_x509_cert_url,
    client_x509_cert_url,
    universe_domain
  }),
});

module.exports = admin;