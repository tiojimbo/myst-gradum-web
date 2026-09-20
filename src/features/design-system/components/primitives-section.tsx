"use client";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Progress, Stepper } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert } from "@/components/ui/alert";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { EmptyState } from "@/components/shared/empty-state";
import { SearchInput } from "@/components/shared/search-input";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { MediaPlaceholder } from "@/components/shared/media-placeholder";
import { Section } from "./section";
export function PrimitivesSection() {
  const confirmTrigger = useRef<HTMLButtonElement>(null);
  const [confirm, setConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [slider, setSlider] = useState([51]);
  return <>
    <Section id="botoes" title="05 · Botões" source="components/core/Button.jsx · Button real">
      <div className="space-y-5">{(["primary", "secondary", "tonal", "ghost", "dark"] as const).map((variant) => <div key={variant} className="flex flex-wrap items-center gap-3">{(["sm", "md", "lg"] as const).map((size) => <Button key={size} variant={variant} size={size} onClick={() => setMessage(`Botão ${variant} ${size} acionado localmente.`)}>{variant} · {size}</Button>)}<Button variant={variant} disabled>Desabilitado</Button><Button variant={variant} aria-busy disabled>Carregando…</Button></div>)}</div>
      <div className="flex flex-wrap gap-3"><Button size="icon" aria-label="Adicionar exemplo" onClick={() => setMessage("Exemplo adicionado localmente.")}><Icon name="add" /></Button><Button className="shadow-focus">Foco demonstrado</Button><div className="rounded-md bg-graphite-900 p-3"><Button variant="ghost" className="text-blue-200 hover:bg-graphite-800">Sobre fundo escuro</Button></div></div>
    </Section>
    <Section id="formularios" title="06 · Formulários" source="components/core/Field, Input, Checkbox, RadioGroup, Switch, Slider">
      <div className="ds-demo-grid">{(["neutral", "focus", "error", "disabled"] as const).map((tone) => <Field key={tone} label={`Campo ${tone}`} htmlFor={`field-${tone}`} tone={tone} helper={tone === "error" ? "Confira o valor informado." : "Texto de apoio"}><Input id={`field-${tone}`} disabled={tone === "disabled"} invalid={tone === "error"} className={tone === "focus" ? "shadow-focus border-blue-500" : undefined} defaultValue={tone === "disabled" ? "Indisponível" : ""} placeholder="Digite aqui" /></Field>)}</div>
      <SearchInput placeholder="Buscar na demonstração" onSearch={(value) => setMessage(`Busca local: ${value}`)} /><div className="flex flex-wrap gap-5">{[false, true].map((disabled) => <div key={String(disabled)} className="space-y-3"><Label className="flex items-center gap-3"><Checkbox defaultChecked disabled={disabled} />Checkbox {disabled ? "desabilitado" : "selecionado"}</Label><Label className="flex items-center gap-3"><Checkbox disabled={disabled} />Checkbox não selecionado</Label><Label className="flex items-center gap-3"><Switch defaultChecked disabled={disabled} />Ativado</Label><Label className="flex items-center gap-3"><Switch disabled={disabled} />Desativado</Label></div>)}</div>
      <RadioGroup defaultValue="a" aria-label="Preferência demonstrativa"><Label className="flex items-center gap-3"><RadioGroupItem value="a" />Opção selecionada</Label><Label className="flex items-center gap-3 rounded-md border border-border p-4"><RadioGroupItem value="b" />RadioCard · opção em superfície</Label><Label className="flex items-center gap-3"><RadioGroupItem value="c" disabled />Indisponível</Label></RadioGroup>
      <div className="space-y-3"><Label>Disponibilidade demonstrativa: {slider[0]}%</Label><Slider value={slider} onValueChange={setSlider} aria-label="Disponibilidade demonstrativa" /><Slider disabled defaultValue={[30]} aria-label="Disponibilidade indisponível" /></div>
    </Section>
    <Section id="progresso" title="07 · Progresso" source="components/core/Progress.jsx">
      <div className="space-y-4">{(["action", "success", "soft"] as const).map((tone) => <div key={tone} className="space-y-3"><span className="text-sm">{tone}</span>{(["md", "sm", "xs"] as const).map((size) => <div key={size} className="space-y-2"><p className="flex justify-between text-sm"><span>{tone} · {size}</span><span className="font-mono">67%</span></p><Progress value={67} tone={tone} size={size} label={`${tone} ${size}`} /></div>)}</div>)}<Progress indeterminate label="Progresso indeterminado" /><div className="rounded-md bg-graphite-900 p-4"><Progress onDark value={40} label="Progresso sobre fundo escuro" /></div><Stepper current={2} total={4} /></div>
    </Section>
    <Section id="cards" title="08 · Cards e listas" source="components/core/Card.jsx · EmptyState.jsx">
      <div className="ds-demo-grid">{(["flat", "sm", "interactive"] as const).map((elevation) => <Card key={elevation} elevation={elevation}><p className="text-overline font-bold uppercase tracking-[.2em] text-graphite-600">Overline</p><h3 className="mt-3 font-bold">{elevation}</h3><p className="mt-2 text-sm">Um card agrupa um conceito.</p></Card>)}<Card className="bg-graphite-900 text-white">Superfície escura</Card><Card className="bg-blue-50">Superfície brand</Card></div><div className="flex flex-wrap gap-3">{(["none", "sm", "md", "lg"] as const).map((padding) => <Card key={padding} padding={padding}>Espaço {padding}</Card>)}</div><EmptyState title="Comece com o que você tem" description="Importe um curso, envie um documento ou explore uma demonstração." /><MediaPlaceholder />
    </Section>
    <Section id="navegacao" title="09 · Navegação e feedback" source="Tabs, Menu, Dialog, Alert e Badge">
      <div className="flex flex-wrap gap-3">{(["brand", "neutral", "success", "warning", "danger", "dark"] as const).flatMap((tone) => (["sm", "md"] as const).map((size) => <Badge key={tone + size} tone={tone} size={size}>{tone} · {size}</Badge>))}</div>
      {["pill", "underline"].map((variant) => <Tabs key={variant} defaultValue="one"><TabsList aria-label={`Abas ${variant}`}><TabsTrigger value="one" className={variant === "underline" ? "rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent" : ""}>Visão geral</TabsTrigger><TabsTrigger value="two" className={variant === "underline" ? "rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent" : ""}>Semana</TabsTrigger><TabsTrigger value="three" className={variant === "underline" ? "rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent" : ""} disabled>Indisponível</TabsTrigger></TabsList><TabsContent value="one" className="p-4">Conteúdo da visão geral</TabsContent><TabsContent value="two" className="p-4">Conteúdo da semana</TabsContent></Tabs>)}
      <div className="ds-demo-grid">{(["info", "success", "warning", "danger"] as const).map((tone) => <Alert key={tone} tone={tone} title={tone} description="Mensagem demonstrativa com orientação clara." />)}</div>
      <div className="flex flex-wrap gap-3"><Dialog><DialogTrigger asChild><Button variant="secondary">Abrir diálogo</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Diálogo demonstrativo</DialogTitle><DialogDescription>Foco contido e retorno ao botão ao fechar.</DialogDescription></DialogHeader><Input aria-label="Campo no diálogo" /><DialogFooter><DialogClose asChild><Button>Concluir</Button></DialogClose></DialogFooter></DialogContent></Dialog><Button ref={confirmTrigger} variant="secondary" onClick={() => setConfirm(true)}>Abrir confirmação</Button><ConfirmDialog onCloseAutoFocus={(event) => { event.preventDefault(); confirmTrigger.current?.focus(); }} open={confirm} onOpenChange={setConfirm} title="Confirmar exemplo?" description="Esta ação altera somente a demonstração." onConfirm={() => { setMessage("Confirmação demonstrativa concluída."); setConfirm(false); }} />
      <DropdownMenu><DropdownMenuTrigger asChild><Button variant="secondary">Abrir menu</Button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuLabel>Projeto demonstrativo</DropdownMenuLabel><DropdownMenuItem onSelect={() => setMessage("Item selecionado.")}>Selecionar</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem disabled>Indisponível</DropdownMenuItem></DropdownMenuContent></DropdownMenu></div>
      <p role="status" className="text-sm text-graphite-600">{message}</p>
    </Section>
  </>;
}
