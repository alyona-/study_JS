MERGE INTO Atm_Expanse A
USING (VALUES ((SELECT Snum FROM Rondo WHERE AtmLuno = '000004598'), 7, 'АВТОВОКЗАЛ', NULL, '01.01.2004', '01.01.2005',
               NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Y')) AS V(RonLink, ExploiteLvl, Location, DT_EXPLOITE,
                                                                          DT_GUARANT1, DT_GUARANT2, DT_MOUNT, DT_LINK1,
                                                                          DT_SIGNAL, DT_TECHSERV1, DT_SERVSERV,
                                                                          DT_CRYPT, DT_INKASS1, DT_TECHSERV2,
                                                                          EXPLOITEDOCS)
ON A.RonLink = V.RonLink
WHEN MATCHED THEN
    UPDATE
    SET (ExploiteLvl, Location, DT_EXPLOITE, DT_GUARANT1, DT_GUARANT2, DT_MOUNT, DT_LINK1, DT_SIGNAL, DT_TECHSERV1,
         DT_SERVSERV, DT_CRYPT, DT_INKASS1, DT_TECHSERV2, EXPLOITEDOCS) = (V.ExploiteLvl, V.Location, V.DT_EXPLOITE,
                                                                           V.DT_GUARANT1, V.DT_GUARANT2, V.DT_MOUNT,
                                                                           V.DT_LINK1, V.DT_SIGNAL, V.DT_TECHSERV1,
                                                                           V.DT_SERVSERV, V.DT_CRYPT, V.DT_INKASS1,
                                                                           V.DT_TECHSERV2, V.EXPLOITEDOCS)
WHEN NOT MATCHED THEN
    INSERT (RonLink, ExploiteLvl, Location, DT_EXPLOITE, DT_GUARANT1, DT_GUARANT2, DT_MOUNT, DT_LINK1, DT_SIGNAL,
            DT_TECHSERV1, DT_SERVSERV, DT_CRYPT, DT_INKASS1, DT_TECHSERV2, EXPLOITEDOCS)
    VALUES (V.RonLink, V.ExploiteLvl, V.Location, V.DT_EXPLOITE, V.DT_GUARANT1, V.DT_GUARANT2, V.DT_MOUNT, V.DT_LINK1,
            V.DT_SIGNAL, V.DT_TECHSERV1, V.DT_SERVSERV, V.DT_CRYPT, V.DT_INKASS1, V.DT_TECHSERV2, V.EXPLOITEDOCS);

MERGE INTO Div_Rondo M
USING (SELECT RSnum AS RonLink, DR.GroupLink, DG.Snum AS NewGroupLink, D.Snum AS DivLink
       FROM Division D
                JOIN (SELECT Snum AS RSnum, BankLink AS RBankLink FROM Rondo WHERE AtmLuno = '000004598')
                     ON BankLink = RBankLink
                LEFT JOIN DivGroup DG ON DG.DivLink = D.Snum AND (GroupName = 'склад' OR GroupName = 'Склад')
                LEFT JOIN Div_Rondo DR ON DR.RonLink = RSnum AND DR.DivLink = D.Snum
       WHERE FlCity = 'L'
       FETCH FIRST ROW ONLY) AS V
ON M.RonLink = V.RonLink AND M.GroupLink = V.GroupLink
WHEN MATCHED AND V.GroupLink IS NOT NULL AND V.NewGroupLink IS NULL THEN DELETE
WHEN MATCHED AND V.GroupLink IS NOT NULL AND V.NewGroupLink != V.GroupLink THEN
    UPDATE
    SET GroupLink = V.NewGroupLink,
        DivLink   = V.DivLink
WHEN NOT MATCHED AND V.GroupLink IS NULL AND V.NewGroupLink IS NOT NULL THEN
    INSERT (RonLink, GroupLink, DivLink)
    VALUES (V.RonLink, V.NewGroupLink, V.DivLink) ELSE IGNORE;