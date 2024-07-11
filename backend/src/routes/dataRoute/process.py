import sys
import time
import boto3

def start_job(job_name, media_file_uri, bucket_name, role_arn):
    print("Tarun: python3 process.py start <job_name> <media_file_uri> <bucket_name> <role_arn>")
    transcribe = boto3.client('transcribe', 'us-east-1')
    transcribe.start_medical_transcription_job(
        MedicalTranscriptionJobName=job_name,
        LanguageCode='en-US',
        MediaFormat='mp4',
        DataAccessRoleArn=role_arn,
        Media={'MediaFileUri': media_file_uri},
        OutputBucketName=bucket_name,
        Specialty='PRIMARYCARE',  # Add the Specialty parameter
        Type='DICTATION',  # Add the Type parameter
        ContentIdentificationType='PHI',
        Settings={'ShowSpeakerLabels': False, 'ChannelIdentification': True}
        ChannelDefinitions = [
      {
        'ChannelId': 0, 
        'ParticipantRole': 'CLINICIAN'
      }, {
        'ChannelId': 1, 
        'ParticipantRole': 'PATIENT'
      }
    ]
    )
    print("Job started:", job_name)

def get_job_status(job_name):
    transcribe = boto3.client('transcribe', 'us-east-1')
    while True:
        status = transcribe.get_medical_transcription_job(
            MedicalTranscriptionJobName=job_name
        )
        if status['MedicalTranscriptionJob']['TranscriptionJobStatus'] in ['COMPLETED', 'FAILED']:
            print(status)
            break
        print("Not ready yet...")
        time.sleep(5)

if __name__ == "__main__":
    print("Tarun in main ",sys.argv)

    if len(sys.argv) < 2:
        print("Usage: python3 process.py <command> <args>")
        sys.exit(1)

    command = sys.argv[1]
    if command == "start":
        if len(sys.argv) != 6:
            print("Usage: python3 process.py start <job_name> <media_file_uri> <bucket_name> <role_arn>")
            sys.exit(1)
        start_job(sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5])
    elif command == "status":
        if len(sys.argv) != 3:
            print("Usage: python3 process.py status <job_name>")
            sys.exit(1)
        get_job_status(sys.argv[2])
    else:
        print("Unknown command:", command)
        sys.exit(1)
