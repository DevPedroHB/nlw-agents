import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useAudioRecorder } from "@/hooks/use-audio-recorder";
import { useUploadAudio } from "@/http/upload-audio";
import { AlertCircleIcon, ArrowLeft, Mic, Square } from "lucide-react";
import { Link, Navigate, useParams } from "react-router";
import { toast } from "sonner";

type RecordRoomAudio = {
	roomId: string;
};

export default function RecordRoomAudio() {
	const params = useParams<RecordRoomAudio>();

	if (!params.roomId) {
		return <Navigate to="/" replace />;
	}

	const { mutateAsync, isPending } = useUploadAudio(params.roomId);

	const {
		status,
		mediaBlobUrl,
		error,
		stopRecording,
		startRecording,
		clearBlobUrl,
	} = useAudioRecorder({
		askPermissionOnMount: true,
		async onStop(_blobUrl, blob) {
			await mutateAsync(blob, {
				onError(error) {
					toast.error(error.message);
				},
				onSuccess() {
					toast.success("Audio enviado com sucesso!");
				},
			});
		},
	});

	function handleToggleRecording() {
		if (status === "recording") {
			stopRecording();
		} else {
			clearBlobUrl();

			startRecording();
		}
	}

	const isRecording = status === "recording";

	return (
		<main className="min-h-screen">
			<div className="mx-auto px-4 py-8 max-w-4xl container">
				<div className="mb-8">
					<div className="flex justify-between items-center mb-4">
						<Button type="button" variant="outline" asChild>
							<Link to={`/room/${params.roomId}`}>
								<ArrowLeft className="mr-2 size-4" />
								Voltar para a sala
							</Link>
						</Button>
					</div>
					<h1 className="mb-2 font-bold text-foreground text-3xl">
						Gravador de Áudio
					</h1>
					<p className="text-muted-foreground">
						Grave um áudio personalizado para fornecer mais contexto às
						respostas da IA dentro desta sala.
					</p>
				</div>
				<Card>
					<CardHeader>
						<CardTitle>Nova Gravação</CardTitle>
						<CardDescription>
							Pressione o botão para iniciar ou parar a gravação. Após o envio,
							o áudio será usado como base para interpretar as perguntas feitas.
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col justify-center items-center gap-6">
						{error ? (
							<Alert variant="destructive">
								<AlertCircleIcon />
								<AlertTitle>Erro ao gravar o áudio</AlertTitle>
								<AlertDescription>
									Ocorreu um erro durante a gravação ou envio do áudio.
									Verifique se o microfone está conectado e autorizado nessa
									página. Se o problema persistir, contate o suporte.
								</AlertDescription>
							</Alert>
						) : (
							<>
								<Button
									onClick={handleToggleRecording}
									variant={isRecording ? "destructive" : "default"}
									isLoading={isPending}
								>
									{isPending ? (
										"Enviando..."
									) : isRecording ? (
										<>
											<Square className="size-5" />
											Parar Gravação
										</>
									) : (
										<>
											<Mic className="size-5" />
											Iniciar Gravação
										</>
									)}
								</Button>
								<p className="text-muted-foreground text-sm">
									Status atual:{" "}
									<span
										className={`font-semibold ${isRecording ? "text-red-600" : "text-green-600"}`}
									>
										{status === "idle"
											? "Aguardando"
											: status === "recording"
												? "Gravando"
												: "Parado"}
									</span>
								</p>
								{mediaBlobUrl && (
									<div>
										<p className="mb-2 text-muted-foreground text-sm">
											Pré-visualização do áudio gravado:
										</p>
										<audio
											controls
											src={mediaBlobUrl}
											className="border rounded-md w-full"
										>
											<track
												label="Legendas em Português"
												src="/path-to-captions-file.vtt"
												srcLang="pt-BR"
												kind="captions"
											/>
										</audio>
									</div>
								)}
							</>
						)}
					</CardContent>
				</Card>
			</div>
		</main>
	);
}
