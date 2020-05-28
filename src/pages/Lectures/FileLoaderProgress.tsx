import React, { useEffect, useState, useRef } from 'react';
import { Progress } from 'semantic-ui-react';
import http from '../../api/http';

interface Props {
    file: any;
    onUploaded: (url: string) => void;
}

const FileLoaderProgress = (props: Props) => {
    const { file, onUploaded } = props;
    const prevFileRef = useRef();
    const [fileName, setFileName] = useState('');
    const [loading, setLoading] = useState(false);
    const [localReader, setLocalReader] = useState(false);
    const [percentCompleted, setPercentCompleted] = useState(0);
    const [videoUrl, setVideoUrl] = useState('');

    const separator = Date.now().toString();

    const onUploadVideo = async (uploadedFile: File) => {
        const newFileName = uploadedFile.name.split('.').join(`-${separator}.`);
        const config = {
            onUploadProgress: (progressEvent: any) => {
                setPercentCompleted(
                    Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    )
                );
            }
        };
        const formdata = new FormData();
        formdata.append('lectureVideo', file, newFileName);
        const response = await http.post('/api/aws/upload-video', formdata, {
            ...config,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        setVideoUrl(response.data.videoUrl);
        onUploaded(response.data.videoUrl);
        setLocalReader(false);
        setFileName(newFileName);
    };

    const deletePrevFile = async (prevFileName: string) => {
        const data = {
            file: prevFileName
        };
        await http.remove('/api/aws/upload-video', data);
    };

    const prevFile = prevFileRef.current;

    useEffect(() => {
        setLoading(true);
        if (prevFile && props.file !== null) {
            deletePrevFile(fileName);
        }

        prevFileRef.current = props.file;

        const reader = new FileReader();
        if (props.file) {
            reader.readAsDataURL(props.file);
        }

        reader.onloadend = () => {
            setLocalReader(true);
            setLoading(false);
            onUploadVideo(props.file);
        };
    }, [file]);

    if (!file) {
        return null;
    }

    return (
        <div>
            {loading && <h5>Upload File...</h5>}
            {localReader && (
                <div>
                    <h5>Sending...</h5>
                    <Progress
                        color="teal"
                        percent={percentCompleted}
                        progress
                    />
                </div>
            )}
            {videoUrl.length > 0 && (
                <img src="" alt={file.name} height={200} width={200} />
            )}
        </div>
    );
};

export default FileLoaderProgress;
