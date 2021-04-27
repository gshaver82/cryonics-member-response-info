import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    :root {
        --primary-color: ${({ theme }) => theme.background};
        --prime-border: ${({ theme }) => theme.blackLightgray};
        --secondary-border: ${({ theme }) => theme.secondaryBorder};
        --card-hover: ${({ theme }) => theme.hover};
        --modal-bgcolor: ${({ theme }) => theme.body};
        --divider: ${({ theme }) => theme.divide};
        --table-style: ${({ theme }) => theme.tableStyle};
        --table-border-style: ${({ theme }) => theme.borderStyle};
        --timer-btns: ${({ theme }) => theme.timerBtns1};
        --timer-btns-hover: ${({ theme }) => theme.timerBtns2};
        --card-border: ${({ theme }) => theme.cardBorder};
        --tag-color: ${({ theme }) => theme.tagColor};
        --text-input-color: ${({ theme }) => theme.inputColor};
        --category-badge: ${({ theme }) => theme.categoryBadge};
        --badge-border: ${({ theme }) => theme.badgeBorder};
        --badge-text: ${({ theme }) => theme.badgeText};
        --badge-text-hover: ${({ theme }) => theme.badgeTextHover};
        --badge-bg-hover: ${({ theme }) => theme.badgeBgHover};
        --badge-border-hover: ${({ theme }) => theme.badgeBorderHover};
        --form-border: ${({ theme }) => theme.formBorder};
        --amount-btns: ${({ theme }) => theme.amountBtns};
        --input-timer-color: ${({ theme }) => theme.inputTimerColor};
        --input-timer-text: ${({ theme }) => theme.inputTimerText};
        --btn-subtle: ${({ theme }) => theme.btnSubtle};
        --placeholder: ${({ theme }) => theme.placeHolder};
        --nav-border: ${({ theme }) => theme.navBorder};
        --text-fill: ${({ theme }) => theme.textFill};
        --google-color: ${({ theme }) => theme.googleColor};
        --google-text: ${({ theme }) => theme.googleText};
        transition: all 0.50s linear;
    }
    body {
        background: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text};
        transition: all 0.50s linear;
    }
    .card {
        background: ${({ theme }) => theme.background};
    }
    .card-footer {
        background: ${({ theme }) => theme.background};
    }
    .recipe-text {
        color: ${({ theme }) => theme.recipeText};
    }
    `
