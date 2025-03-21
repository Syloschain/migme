
import { useState, useRef } from "react";
import { Mic, Square, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

interface VoiceRecorderProps {
  onVoiceRecorded: (blob: Blob) => void;
  onCancel: () => void;
}

const VoiceRecorder = ({ onVoiceRecorded, onCancel }: VoiceRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingProgress, setRecordingProgress] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const { toast } = useToast();
  
  const MAX_RECORDING_TIME = 60; // Maximum recording time in seconds

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      
      // Start timer
      let seconds = 0;
      timerRef.current = window.setInterval(() => {
        seconds++;
        setRecordingTime(seconds);
        setRecordingProgress((seconds / MAX_RECORDING_TIME) * 100);
        
        // Auto-stop after MAX_RECORDING_TIME
        if (seconds >= MAX_RECORDING_TIME) {
          stopRecording();
        }
      }, 1000);
    } catch (err) {
      toast({
        title: "Microphone Access Denied",
        description: "Please allow microphone access to record voice messages.",
        variant: "destructive"
      });
      onCancel();
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      
      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      // Stop all audio tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        onVoiceRecorded(audioBlob);
        setIsRecording(false);
        setRecordingTime(0);
        setRecordingProgress(0);
      };
    }
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      // Stop all audio tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      
      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      setIsRecording(false);
      setRecordingTime(0);
      setRecordingProgress(0);
      onCancel();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-2 bg-accent/30 rounded-md w-full">
      {!isRecording ? (
        <div className="flex justify-center">
          <Button 
            variant="ghost" 
            className="flex items-center gap-2" 
            onClick={startRecording}
          >
            <Mic className="h-4 w-4 text-red-500" />
            <span>Tap to start recording</span>
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></div>
              <span className="text-sm font-medium">Recording {formatTime(recordingTime)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost" onClick={cancelRecording} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={stopRecording} className="h-8 w-8">
                <Square className="h-4 w-4" />
              </Button>
              <Button size="icon" onClick={stopRecording} className="h-8 w-8 bg-migblue hover:bg-migblue-dark">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Progress value={recordingProgress} className="h-1" />
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
