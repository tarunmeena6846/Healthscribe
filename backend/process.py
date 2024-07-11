import json
import sys
import time
import boto3

def start_job(job_name,media_file_uri,bucket_name, role_arn):
    print("Starting job:", job_name)
    transcribe = boto3.client('transcribe', region_name='us-east-1')
    print("transceibe",transcribe)
    transcribe.start_medical_scribe_job(
        MedicalScribeJobName=job_name,
        # LanguageCode='en-US',
        # MediaFormat='mp4',
        DataAccessRoleArn=role_arn,
        Media={'MediaFileUri': media_file_uri},
        OutputBucketName=bucket_name,
        # Specialty='PRIMARYCARE',  # Add the Specialty parameter
        # Type='DICTATION',  # Add the Type parameter
        # ContentIdentificationType='PHI',
        Settings={'ShowSpeakerLabels': False, 'ChannelIdentification': True},
        ChannelDefinitions=[
            {'ChannelId': 0, 'ParticipantRole': 'CLINICIAN'},
            {'ChannelId': 1, 'ParticipantRole': 'PATIENT'}
        ]
    )
    print("Job started:", job_name)

def get_job_status(job_name):
    transcribe = boto3.client('transcribe', region_name='us-east-1')
    
    while True:
        response = transcribe.get_medical_scribe_job(
            MedicalScribeJobName=job_name
        )
        
        job_status = response['MedicalScribeJob']['MedicalScribeJobStatus']
        
        if job_status in ['COMPLETED', 'FAILED']:
            result = {"status": job_status}
            
            if job_status == 'COMPLETED':
                medical_scribe_output = response['MedicalScribeJob']['MedicalScribeOutput']
                transcript_file_uri = medical_scribe_output['TranscriptFileUri']
                clinical_document_uri = medical_scribe_output['ClinicalDocumentUri']
                
                result.update({
                    "transcript_file_uri": transcript_file_uri,
                    "clinical_document_uri": clinical_document_uri
                })
                
            print(json.dumps(result))
            break
        
        time.sleep(5)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 process.py <command> <args>")
        sys.exit(1)

    command = sys.argv[1]
    if command == "start":
        if len(sys.argv) != 6:
            print("Usage: python3 process.py start <job_name> <media_file_uri> <bucket_name> <role_arn>")
            sys.exit(1)
        print(sys.argv[2],"",sys.argv[3],"",sys.argv[4],"",sys.argv[5])
        start_job(sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5])
    elif command == "status":
        if len(sys.argv) != 3:
            print("Usage: python3 process.py status <job_name>")
            sys.exit(1)
        get_job_status(sys.argv[2])
    else:
        print("Unknown command:", command)
        sys.exit(1)
