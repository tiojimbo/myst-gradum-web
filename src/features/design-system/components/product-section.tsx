"use client";
import { useState, useId } from "react";
import { SessionCard, SessionRow } from "@/components/shared/session-card";
import { ReviewCard } from "@/components/shared/review-card";
import { ResourceCard } from "@/components/shared/resource-card";
import { PhaseRoute } from "@/components/shared/phase-route";
import { TimelineItem } from "@/components/shared/timeline-item";
import { NoteCard } from "@/components/shared/note-card";
import { MasteryRing } from "@/components/shared/mastery-ring";
import { MasteryLegend } from "@/components/shared/mastery-legend";
import { CompetencyRow, MasteryDelta } from "@/components/shared/competency-row";
import { DayTile } from "@/components/shared/day-tile";
import { StatusChip, ProjectChip, SourceBadge, ConfidenceBadge, TimestampChip } from "@/components/shared/chips";
import { NoteEditor, KnowledgeLinks } from "@/components/shared/note-editor";
import { FeedbackPanel } from "@/components/shared/feedback-panel";
import { RecallPanel } from "@/components/shared/recall-panel";
import { CompanionSidebar } from "@/components/shared/companion-sidebar";
import { FocusHeader } from "@/components/shared/focus-header";
import { UploadDropzone, ImportReview } from "@/components/shared/upload-dropzone";
import { LessonList } from "@/components/shared/lesson-list";
import { CommandSearch } from "@/components/shared/command-search";
import { DataTable } from "@/components/shared/data-table/data-table";
import { ActivityPanel, PreviewPanel, LessonPanel, TaskPanel, SessionStage, SessionSummary, SESSION_ACTIVITIES } from "@/components/shared/session-stage";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Section } from "./section";
import { SESSION, PHASES, RESOURCES } from "../data/examples";
export function EditorDemo() {
  const bodyId = useId();
  const [title, setTitle] = useState("Rec.709 × Display P3");
  const [active, setActive] = useState<string[]>([]);
  const [links, setLinks] = useState(["Color Spaces", "Gamut", "Rec.709"]);
  const [status, setStatus] = useState("Exemplo local");
  return <NoteEditor title={title} onTitleChange={setTitle} timestamp="18:32" context="Color Science · FAW School · Aula 13" status={status} toolbarExtra={<Button variant="ghost" size="sm" aria-label="Gerar flashcard demonstrativo" onClick={() => setStatus("Flashcard demonstrativo solicitado localmente")}><Icon name="stack" size="inline" />Flashcard</Button>} active={active} onCommand={(command) => setActive((current) => current.includes(command) ? current.filter((item) => item !== command) : [...current, command])} footer={<KnowledgeLinks items={links} onAdd={() => { setLinks((current) => current.includes("Exposição") ? current : [...current, "Exposição"]); setStatus("Vínculo demonstrativo"); }} />}><label className="sr-only" htmlFor={bodyId}>Conteúdo da nota</label><div id={bodyId} role="textbox" aria-label="Conteúdo da nota" aria-multiline contentEditable suppressContentEditableWarning onInput={() => setStatus("Alterado localmente")} className="min-h-[200px] space-y-4 outline-none"><p><strong>Gamut</strong> é a faixa de cores que o espaço consegue representar; <em>gamma</em> é a curva de resposta de luminância. Não são a mesma coisa.</p><ul className="list-disc space-y-2 pl-5"><li>Rec.709 continua sendo o padrão de entrega para broadcast e web.</li><li>Display P3 é obrigatório quando a entrega é para tela wide-gamut e o cliente pede HDR-ready.</li></ul><blockquote className="border-l-2 border-blue-500 pl-4 text-graphite-600">Se o destino não declara o espaço, entregue em Rec.709.</blockquote></div></NoteEditor>;
}
export function SessionDemo({ compact = false }: { compact?: boolean }) {
  const [current, setCurrent] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  if (completed) return <SessionSummary title="Sessão concluída · exemplo" elapsed="1h04 estudados · 1h15 planejados" resources={["Shutter Speed", "Color Science"]} reviewItems={3} />;
  return <div className="space-y-5"><SessionStage onDark compact={compact} current={current} onChange={setCurrent} header={<FocusHeader session="Color Science" elapsed={current === 0 ? "4 min" : "28 min"} progress={Math.max(7, Math.round(current / 6 * 100))} onDark compact onClose={() => setMessage("Encerramento demonstrativo, sem sessão real.")} />} companion={<CompanionSidebar session="Color Science" lesson="Color Spaces" position="18:32 / 41:15" notes={[{timestamp:"18:32",text:"Diferença entre Rec.709 e Display P3."}]} />}><ActivityPanel step={SESSION_ACTIVITIES[current]} title={current === 0 ? "O que esta sessão vai te dar" : SESSION_ACTIVITIES[current]}>
    {current === 0 && <PreviewPanel objectives={compact ? ["Escolher o espaço de cor correto para cada entrega."] : ["Escolher o espaço de cor correto para cada entrega.", "Explicar a diferença prática entre gamut e gamma."]} questions={compact ? ["Por que Rec.709 ainda é o padrão de entrega?"] : ["Por que Rec.709 ainda é o padrão de entrega?", "O que quebra quando você entrega em Display P3 sem avisar?"]} />}
    {current === 1 && <LessonPanel lesson="Color Spaces" source="FAW School · Aula 13" position="18:32 / 41:15" progress={45} onOpen={() => setMessage("Abertura de recurso simulada.")} onNote={() => setMessage("Captura de nota simulada.")} />}
    {current === 2 && <RecallPanel question="O que você acabou de aprender?" value={answer} onChange={setAnswer} onSubmit={() => setCurrent(3)} onSpeak={() => setMessage("Apresentação de resposta por voz, sem captura.")} />}
    {current === 3 && <FeedbackPanel title="Resposta parcialmente correta" points={["Você relacionou a exposição ao movimento.", "Compare também a taxa de quadros."]} />}
    {(current === 4 || current === 5) && <TaskPanel brief={current === 4 ? "Explique a diferença entre exposição e taxa de quadros." : "Descreva um clipe de 20 segundos e a escolha do obturador."} checklist={["Justifique sua escolha.", "Relacione ao recurso observado."]}><label className="block space-y-2"><span className="text-sm">Resposta demonstrativa</span><textarea className="min-h-[120px] w-full rounded-md border border-graphite-700 bg-graphite-800 p-4 text-white" value={answer} onChange={(event) => setAnswer(event.target.value)} /></label></TaskPanel>}
    {current === 6 && <div className="space-y-4"><h4 className="font-semibold">Dois conceitos antigos ligados a esta sessão</h4><ReviewCard estimate="5 min" items={[{label:"Gamma e gamut",count:1},{label:"Taxa de quadros",count:1}]} /><Button onClick={() => setCompleted(true)}>Concluir sessão demonstrativa</Button></div>}
  </ActivityPanel></SessionStage><p role="status" className="text-sm text-graphite-600">{message}</p></div>;
}
export function TableDemo() {
  const [state, setState] = useState<"ready" | "loading" | "error" | "empty">("ready");
  return <div className="space-y-4"><div className="flex flex-wrap gap-2">{(["ready","loading","error","empty"] as const).map((value) => <Button key={value} variant="secondary" size="sm" onClick={() => setState(value)}>{({ready:"Tabela preenchida",loading:"Tabela carregando",error:"Tabela com erro",empty:"Tabela vazia"})[value]}</Button>)}</div><div className="ds-table"><DataTable queryKey={["design-system-local"]} endpoint="/demonstracao-sem-rede" localData={{ rows: state === "empty" ? [] : RESOURCES, state: state === "empty" ? "ready" : state }} defaultLimit={2} descriptor={{ columns: [{ key: "title", header: "Material", sortable: true }, { key: "kind", header: "Tipo" }, { key: "count", header: "Conteúdo", align: "right" }], filters: [{ key: "kind", label: "Tipo de recurso", options: [{ label: "Curso", value: "Curso" }, { label: "Documento", value: "Documento" }] }], emptyState: { title: "Nenhum material demonstrativo", description: "Selecione a tabela preenchida para voltar." } }} /></div></div>;
}
export function ProductSection() {
  const [imported, setImported] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  return <>
    <Section id="produto" title="13 · Componentes de produto" source="components/product/ · exemplos demonstrativos">
      <div className="ds-demo-grid"><SessionCard {...SESSION} /><ReviewCard estimate="18 min" items={[{label:"Perguntas abertas",count:4},{label:"Flashcards",count:12}]} /><SessionRow time="18:00" project="Inglês" title="Listening" duration="30 min" /></div>
      <div className="ds-demo-grid">{(["curso","documento","aula","artigo","livro"] as const).map((kind) => <ResourceCard key={kind} kind={kind} title={kind === "curso" ? "Filmmaking Academy" : "Color Science"} meta="Dado demonstrativo" project="Audiovisual" progress={42} />)}</div>
      <div className="ds-demo-grid"><PhaseRoute phases={PHASES} /><Card className="space-y-5"><CompetencyRow name="Exposição" mastery={67} /><CompetencyRow name="Cor" mastery={51} /><MasteryDelta from={51} to={67} /><MasteryRing value={67} /><MasteryLegend items={[{label:"Dominado",value:"14 competências",color:"var(--gr-blue-500)"},{label:"Em prática",value:"6 competências",color:"var(--gr-blue-200)"},{label:"Não iniciado",value:"3 competências",color:"var(--gr-graphite-200)"}]} /></Card></div>
      <TimelineItem day="Segunda-feira · exemplo" entries={[{time:"18:00",project:"Audiovisual",title:"Exposição",duration:"45 min"}]} /><TimelineItem day="Dia livre · exemplo vazio" entries={[]} />
      <div className="flex flex-wrap gap-3">{(["empty","done","planned","review"] as const).map((state, index) => <DayTile key={state} state={state} day="SEG" date={String(index+7)} />)}</div>
      <div className="flex flex-wrap items-center gap-3">{(["ativo","pausado","manutencao","concluido","arquivado"] as const).map((status) => <StatusChip key={status} status={status} />)}<ProjectChip name="Audiovisual" /><SourceBadge name="Filmmaking Academy" /><TimestampChip value="18:32" />{(["alta","parcial","baixa"] as const).map((level) => <ConfidenceBadge key={level} level={level} />)}</div>
      <div className="ds-demo-grid">{(["nota","duvida","importante","erro","acao","exemplo"] as const).map((kind) => <NoteCard key={kind} kind={kind} title="Regra dos 180°" body="Trecho demonstrativo." timestamp="18:32" context="Aula 09 · recurso externo" />)}</div>
      <LessonList lessons={[{title:"Introdução",duration:"8 min",state:"concluida"},{title:"Shutter Speed",duration:"18 min",state:"atual"},{title:"Color Science",duration:"24 min",state:"bloqueada"}]} />
      <CommandSearch query="Shutter" groups={[{label:"Competências",results:[{title:"Shutter Speed",meta:"67%"}]},{label:"Notas",results:[{title:"Regra dos 180°",meta:"18:32"}]}]} /><CommandSearch query="Sem resultados" groups={[]} />
      <TableDemo />
      <div className="ds-demo-grid">{(["correto","parcial","incorreto"] as const).map((verdict) => <FeedbackPanel key={verdict} verdict={verdict} title={`Feedback ${verdict}`} points={["Retorno demonstrativo baseado no exemplo fornecido."]} />)}</div>
      <FocusHeader session="Sessão demonstrativa" elapsed="12 min" progress={30} activity="Preview" />
    </Section>
    <Section id="editor" title="Editor de notas" source="components/product/NoteEditor.jsx · ui_kits/gradum-app/NoteScreen.jsx"><EditorDemo /><div className="ds-demo-grid">{(["nota","duvida","importante","erro"] as const).map((kind) => <NoteEditor key={kind} title="" kind={kind} status="Vazio · demonstração" footer={<KnowledgeLinks items={[]} />}><p className="text-graphite-500">Comece a escrever…</p></NoteEditor>)}</div></Section>
    <Section id="sessao" title="Etapas de sessão" source="SessionStage.jsx · FocusHeader.jsx · templates/focus-session/"><SessionDemo /></Section>
    <Section id="onboarding" title="15 · Onboarding e importação" source="UploadDropzone.jsx · ui_kits/gradum-app/OnboardingScreen.jsx"><div className="ds-demo-grid"><UploadDropzone onChoose={() => setImported(true)} /><UploadDropzone dragging onChoose={() => setImported(true)} /></div>{imported && <ImportReview title="Confira o material demonstrativo" onConfirm={() => setConfirmed(true)} />}<p role="status">{confirmed ? "Importação demonstrativa confirmada localmente." : "Objetivo · Diagnóstico · Recursos · Plano"}</p><div className="ds-demo-grid"><Card className="space-y-4"><h3 className="text-h3 font-semibold">Disponibilidade global</h3><p className="text-sm">Quanto tempo você realmente consegue dedicar aos estudos?</p>{[["SEG","06:30–07:30","19:00–20:30"],["TER","06:30–07:30"],["QUA","19:00–21:00"],["QUI","+ adicionar"]].map(([day,...times]) => <div key={day} className="flex flex-wrap items-center gap-3"><strong className="w-[36px] text-xs">{day}</strong>{times.map((time) => <Button key={time} size="sm" variant="secondary">{time}</Button>)}</div>)}<p className="font-mono text-sm">≈ 12h por semana disponíveis</p><Button variant="ghost" size="sm">Usar uma média semanal</Button></Card><Card className="space-y-4"><h3 className="text-h3 font-semibold">Viabilidade · alternativas da referência</h3><p className="text-sm">De iniciante a domínio profissional em audiovisual, em 3 meses, com 12h por semana.</p><RadioGroup defaultValue="Priorizar edição profissional" aria-label="Alternativa demonstrativa de viabilidade">{["Priorizar edição profissional","Manter objetivo e aumentar prazo","Aumentar horas semanais","Continuar mesmo assim"].map((label) => <Label key={label} className="flex items-center gap-3 rounded-md border border-border p-3"><RadioGroupItem value={label} />{label}</Label>)}</RadioGroup></Card><Card className="space-y-4"><h3 className="text-h3 font-semibold">Cobertura e papel das fontes</h3><p className="text-sm">Seu conteúdo cobre ~68% das competências necessárias</p><Progress value={68} />{[["Edição","Muito bem coberto"],["Motion","Bem coberto"],["Câmera","Parcial"],["Color","Parcial"],["Direção","Lacuna"]].map(([name,state]) => <p key={name} className="flex justify-between text-sm"><span>{name}</span><span className="text-graphite-600">{state}</span></p>)}<h4 className="font-semibold">Papel de cada fonte</h4>{[["FAW School","Principal"],["Adobe Learn","Complementar"],["Blackmagic Training","Referência oficial"]].map(([name,role]) => <p key={name} className="flex justify-between text-sm"><span>{name}</span><span>{role}</span></p>)}</Card><Card className="space-y-4"><h3 className="text-h3 font-semibold">Prioridade e divisão do tempo</h3><RadioGroup defaultValue="Principal" aria-label="Prioridade demonstrativa">{[["Principal","Meu maior foco atual."],["Secundário","Quero evoluir, mas não é prioridade máxima."],["Manutenção","Já tenho domínio e quero manter."]].map(([name,description]) => <Label key={name} className="flex gap-3 rounded-md border border-border p-3"><RadioGroupItem value={name} /><span><strong className="block">{name}</strong><small className="font-normal text-graphite-600">{description}</small></span></Label>)}</RadioGroup><p className="text-sm">Você possui 12 horas semanais. Sugestão de divisão da referência:</p><p className="flex justify-between text-sm"><span>Audiovisual · Principal</span><span>8h</span></p><Progress value={67} /><p className="flex justify-between text-sm"><span>Inglês · Secundário</span><span>4h</span></p><Progress value={33} /></Card></div><p className="text-xs text-graphite-600">Exemplos visuais locais. A conversa em quatro fases, diagnóstico, refinamento, importação e plano proposto estão em Composições → Onboarding.</p></Section>
  </>;
}
