# Question Images

Drop your PNG files into the matching subfolder using this naming convention:

```
<section_key>_<NNN>_q.png   ← question stem image
<section_key>_<NNN>_c.png   ← choices image (A–D)
```

## Subfolders and their section keys

| Folder         | Section                        | Example filenames                          |
|----------------|--------------------------------|--------------------------------------------|
| p1_verbal      | Part I — Verbal                | p1_verbal_001_q.png, p1_verbal_001_c.png   |
| p1_inductive   | Part I — Inductive Reasoning   | p1_inductive_001_q.png, ...                |
| p1_quant       | Part I — Quantitative          | p1_quant_001_q.png, ...                    |
| p1_percept     | Part I — Perceptual Acuity     | p1_percept_001_q.png, ...                  |
| p2_biology     | Part II — Biology              | p2_biology_001_q.png, ...                  |
| p2_physics     | Part II — Physics              | p2_physics_001_q.png, ...                  |
| p2_socsci      | Part II — Social Science       | p2_socsci_001_q.png, ...                   |
| p2_chem        | Part II — Chemistry            | p2_chem_001_q.png, ...                     |

## Notes

- Numbers are zero-padded to 3 digits: 001, 002, ... 030
- If a question has a combined stem+choices image, you can use only the `_q.png` file and leave `_c.png` absent — set the choices image path to blank in the Bank Manager
- The app's `EXAM_BANK` already references these exact paths, so adding the files here is all that's needed — no code changes required
- During deployment (e.g. Vercel), these files are served as static assets at `/questions/<subfolder>/<filename>`
