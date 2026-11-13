import type { SupportIntentId } from './whatsapp';

export const HELP_INTENT_KEY = 'maker-help-intent';
export const HELP_REF_KEY = 'maker-help-ref';
export const HELP_HANDOFF_EVENT = 'maker-help-handoff';

const INTENTS: SupportIntentId[] = ['no-model', 'have-idea', 'adapt-lab'];

export function openHelpFromLab(pieceTitle: string) {
  sessionStorage.setItem(HELP_INTENT_KEY, 'adapt-lab');
  sessionStorage.setItem(HELP_REF_KEY, pieceTitle);
  window.dispatchEvent(new Event(HELP_HANDOFF_EVENT));
}

export function readHelpHandoff(): {
  intent: SupportIntentId;
  relatedPiece: string;
  hasHandoff: boolean;
} {
  const storedIntent = sessionStorage.getItem(HELP_INTENT_KEY);
  const storedRef = sessionStorage.getItem(HELP_REF_KEY) || '';

  sessionStorage.removeItem(HELP_INTENT_KEY);
  sessionStorage.removeItem(HELP_REF_KEY);

  const hasIntent =
    Boolean(storedIntent) &&
    INTENTS.includes(storedIntent as SupportIntentId);

  return {
    intent: hasIntent ? (storedIntent as SupportIntentId) : 'no-model',
    relatedPiece: storedRef,
    hasHandoff: hasIntent || Boolean(storedRef),
  };
}
