import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Select } from '@/components/ui/Select';
import { LeadPayload } from '@/types/lead';
import { leadSchema, LeadFormValues } from '../lead.schemas';
import { useLeadMutations } from '../hooks/useLeadMutations';

interface LeadFormModalProps {
  open: boolean;
  mode: 'create' | 'edit';
  initialValues?: LeadPayload;
  leadId?: string;
  onClose: () => void;
}

export const LeadFormModal = ({
  open,
  mode,
  initialValues,
  leadId,
  onClose
}: LeadFormModalProps) => {
  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: initialValues ?? {
      name: '',
      email: '',
      status: 'New',
      source: 'Website'
    }
  });

  const { createLead, updateLead } = useLeadMutations();
  const isSaving = createLead.isPending || updateLead.isPending;

  useEffect(() => {
    if (open) {
      form.reset(
        initialValues ?? {
          name: '',
          email: '',
          status: 'New',
          source: 'Website'
        }
      );
    }
  }, [initialValues, form, open]);

  const handleSubmit = form.handleSubmit(async (values) => {
    if (mode === 'create') {
      await createLead.mutateAsync(values);
    } else if (leadId) {
      await updateLead.mutateAsync({ id: leadId, payload: values });
    }
    onClose();
  });

  return (
    <Modal
      open={open}
      title={mode === 'create' ? 'New Lead' : 'Edit Lead'}
      description="Capture lead details and keep your pipeline moving."
      onClose={onClose}
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} loading={isSaving}>
            {mode === 'create' ? 'Create lead' : 'Save changes'}
          </Button>
        </>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          label="Full name"
          placeholder="Ariana West"
          {...form.register('name')}
          error={form.formState.errors.name?.message}
        />
        <Input
          label="Email address"
          type="email"
          placeholder="ariana@company.com"
          {...form.register('email')}
          error={form.formState.errors.email?.message}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Select label="Status" {...form.register('status')} error={form.formState.errors.status?.message}>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Lost">Lost</option>
          </Select>
          <Select label="Source" {...form.register('source')} error={form.formState.errors.source?.message}>
            <option value="Website">Website</option>
            <option value="Instagram">Instagram</option>
            <option value="Referral">Referral</option>
          </Select>
        </div>
      </form>
    </Modal>
  );
};
