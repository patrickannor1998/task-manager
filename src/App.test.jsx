import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Task manager app', () => {
  it('adds a task and displays it in the list', async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByLabelText(/task input/i);
    const button = screen.getByRole('button', { name: /add task/i });

    await user.type(input, 'Write assignment');
    await user.click(button);

    expect(screen.getByText('Write assignment')).toBeInTheDocument();
  });

  it('updates, deletes, filters, and tracks pending tasks', async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByLabelText(/task input/i);
    const addButton = screen.getByRole('button', { name: /add task/i });

    await user.type(input, 'Write assignment');
    await user.click(addButton);

    expect(screen.getByText(/pending tasks: 1/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /edit/i }));
    const editField = screen.getByDisplayValue('Write assignment');
    await user.clear(editField);
    await user.type(editField, 'Write assignment draft');
    await user.click(screen.getByRole('button', { name: /save/i }));

    expect(screen.getByText('Write assignment draft')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /delete/i }));
    expect(screen.queryByText('Write assignment draft')).not.toBeInTheDocument();

    await user.type(input, 'Review notes');
    await user.click(addButton);
    await user.click(screen.getByRole('checkbox'));
    expect(screen.getByText(/pending tasks: 0/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /done/i }));
    expect(screen.getByText('Review notes')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /pending/i }));
    expect(screen.queryByText('Review notes')).not.toBeInTheDocument();
  });
});
