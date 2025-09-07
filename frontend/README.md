# Frontend (React + Vite)

## Overview
- React + TypeScript + Vite
- State/data: @tanstack/react-query
- UI: Material UI
- Tests: Vitest + Testing Library

## Key docs
- Employee Profile mapping:
  - Types: `src/types/employeeProfile.ts` (`ApiEmployeeProfile` → snake_case, `EmployeeProfile` → camelCase)
  - Mapper: `src/utils/employeeProfileMapper.ts` (`mapFromApiEmployeeProfile`)
  - Hook: `src/hooks/useEmployeeProfile.ts` (fetch + map)

- PDF/DOC exports:
  - Profile PDF preview: `src/components/pdf/EmployeeProfilePDFPreview.tsx`
  - Order DOCX export button: `src/components/orderComponents/OrderTable.tsx`

## Scripts
```
npm run dev
npm run test
```
