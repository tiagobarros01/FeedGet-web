import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Widget } from './Widget';

describe('Widget component', () => {
  it('Should render Widget component', () => {
    const { getByTestId } = render(<Widget />);

    const chatIconElement = getByTestId(/chat-icon-svg/i);

    expect(chatIconElement).toBeInTheDocument();
  });

  it('Should hover Widget component and render text', async () => {
    const { getByTestId } = render(<Widget />);

    const chatIconElement = getByTestId(/chat-icon-svg/i);

    expect(chatIconElement).toBeInTheDocument();

    const chatButtonElement = getByTestId(/widget-button/i);

    await userEvent.hover(chatButtonElement);

    const titleSpanElement = screen.getByText(/feedback/i);

    expect(titleSpanElement).toBeInTheDocument();
  });

  it('Should click on Widget component and shows panel', async () => {
    const { getByTestId } = render(<Widget />);

    const chatIconElement = getByTestId(/chat-icon-svg/i);

    expect(chatIconElement).toBeInTheDocument();

    const chatButtonElement = getByTestId(/widget-button/i);

    await userEvent.click(chatButtonElement);

    const titleSpanElement = screen.getByText(/leave your feedback/i);

    expect(titleSpanElement).toBeInTheDocument();
  });

  it('Should choose a feedback type', async () => {
    const { getByTestId } = render(<Widget />);

    const chatIconElement = getByTestId(/chat-icon-svg/i);

    expect(chatIconElement).toBeInTheDocument();

    const chatButtonElement = getByTestId(/widget-button/i);

    await userEvent.click(chatButtonElement);

    const titleSpanElement = screen.getByText(/leave your feedback/i);

    expect(titleSpanElement).toBeInTheDocument();

    const feedbackButtonElement = screen.getByText(/Problem/i);

    await userEvent.click(feedbackButtonElement);

    const sendFeedbackButtonElement = screen.getByText(/Send feedback/i);

    expect(sendFeedbackButtonElement).toBeInTheDocument();
  });

  it('Should send a feedback', async () => {
    const { getByTestId } = render(<Widget />);

    const chatIconElement = getByTestId(/chat-icon-svg/i);

    expect(chatIconElement).toBeInTheDocument();

    const chatButtonElement = getByTestId(/widget-button/i);

    await userEvent.click(chatButtonElement);

    const titleSpanElement = screen.getByText(/leave your feedback/i);

    expect(titleSpanElement).toBeInTheDocument();

    const feedbackButtonElement = screen.getByText(/Problem/i);

    await userEvent.click(feedbackButtonElement);

    const feedbackTextAreaElement = screen.getByTestId('feedback-textarea');

    fireEvent.change(feedbackTextAreaElement, {
      target: { value: 'feedback test' },
    });

    const sendFeedbackButtonElement = screen.getByText(/send feedback/i);

    await userEvent.click(sendFeedbackButtonElement);

    await waitFor(
      async () => {
        const successTitleElement = await screen.findByText(/appreciate/i);
        
        expect(successTitleElement).toBeInTheDocument();
      },
      {
        timeout: 10000,
      }
    );
  });
});
