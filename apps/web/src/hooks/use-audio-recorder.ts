import {
	type ReactMediaRecorderHookProps,
	useReactMediaRecorder,
} from "react-media-recorder";

export function useAudioRecorder(props?: ReactMediaRecorderHookProps) {
	return useReactMediaRecorder({
		audio: {
			noiseSuppression: true,
			echoCancellation: true,
			autoGainControl: true,
			sampleRate: 44_100,
		},
		...props,
	});
}
