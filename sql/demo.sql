USE milleiro;
INSERT INTO `produto` (`ID`, `NOME`, `DESCRICION`) VALUES
(1, 'Pan millo', 'Lorem ipsum dolor sit amet.'),
(2, 'Pan centeo', 'Laoreet odio vestibulum.'),
(3, 'Pan avea', 'Integer feugiat pellentesque rutrum.');
INSERT INTO `composicion` (`ID`, `PRODUTO_ID`, `NOME`, `CANTIDADE`, `UNIDADE`) VALUES
(1, 1, 'Fariña de millo', 250, 'g'),
(2, 1, 'Levadura', 60, 'g'),
(3, 1, 'Sal', 15, 'g'),
(4, 2, 'Fariña de centeo', 300, 'g'),
(5, 2, 'Levadura', 70, 'g'),
(6, 2, 'Sal', 12, 'g'),
(7, 3, 'Fariña de avea', 500, 'g'),
(8, 3, 'Levadura', 50, 'g'),
(9, 3, 'Sal', 10, 'g');

INSERT INTO `forma_traza` (`ID`, `PRODUTO_ID`, `NUMERO`, `NOME`) VALUES
(1, 1, 1, 'Plantado'),
(2, 1, 2, 'Recolectado'),
(3, 1, 3, 'Entrada'),
(4, 1, 4, 'Forneado'),
(5, 1, 5, 'Envasado'),
(6, 1, 6, 'Salida'),
(7, 2, 1, 'Entrada'),
(8, 2, 2, 'Preparado'),
(9, 2, 3, 'Masa feita'),
(10, 2, 4, 'Forneado'),
(11, 2, 5, 'Salida'),
(12, 3, 1, 'Plantado'),
(13, 3, 2, 'Recolectado'),
(14, 3, 3, 'Forneado'),
(15, 3, 4, 'Envasado');

INSERT INTO `preparacion` (`ID`, `PRODUTO_ID`, `NUMERO`, `TEXTO`) VALUES
(1, 1, 1, 'Laoreet odio vestibulum ullamcorper himenaeos cubilia magna montes velit rhoncus conubia id tortor.'),
(2, 1, 2, 'Velit turpis ut hendrerit duis commodo taciti morbi cursus, imperdiet habitant curae malesuada vulputate diam condimentum neque volutpat, ligula venenatis accumsan orci penatibus sociis natoque.'),
(3, 1, 3, 'Tortor nostra lacus sodales aliquam magnis venenatis blandit, sociosqu senectus nibh pretium dictum nisl massa, metus imperdiet risus donec curabitur luctus.'),
(4, 1, 4, 'Suscipit et imperdiet interdum nunc mauris pharetra at urna nec, tempor nostra arcu litora penatibus in luctus felis.'),
(5, 2, 1, 'Lorem ipsum dolor sit amet consectetur adipiscing elit nec vestibulum, in accumsan nisi orci habitant neque ornare. At dictumst semper felis dui lectus aliquam convallis, leo hendrerit odio pellentesque purus.'),
(6, 2, 2, 'Auctor nulla vehicula lobortis conubia augue varius risus litora imperdiet, ornare cras sollicitudin ultricies integer eget viverra curae, nibh mollis quisque sociosqu pellentesque eleifend sed ante.'),
(7, 2, 3, 'Sem phasellus nam dictum libero potenti ac interdum mus ligula, fusce semper habitasse vivamus aptent convallis duis purus lobortis, auctor varius ante himenaeos felis mauris quisque etiam.'),
(8, 2, 4, 'Penatibus condimentum facilisis ullamcorper metus hac venenatis arcu nibh varius morbi dictumst eu nam, quisque imperdiet mus duis urna elementum vitae consequat dictum congue et.'),
(9, 3, 1, 'Blandit dictumst lacus class ac mus. Auctor mollis donec orci eu accumsan facilisi, scelerisque ante velit aliquet mattis mi, penatibus montes dignissim etiam dictumst.'),
(10, 3, 2, 'Dis interdum venenatis egestas auctor penatibus donec fusce ultricies rhoncus, bibendum conubia non augue aptent odio pellentesque tellus mus, sed ante est lectus euismod curae accumsan commodo.'),
(11, 3, 3, 'Iaculis platea mattis augue sem habitasse dui quam nunc eros conubia ligula nullam scelerisque consequat nam, rutrum ridiculus aptent volutpat integer eu dictumst varius ut imperdiet tortor convallis himenaeos proin.'),
(12, 3, 4, 'Id ullamcorper porta natoque interdum arcu ligula habitasse et tempor, convallis risus quam sociis justo congue ornare vestibulum, habitant magnis rutrum mi velit posuere nostra ultrices.');



INSERT INTO `produto_ref` (`REFERENCIA`, `PRODUTO_ID`) VALUES
('PM1A20001', 1),
('PM1A20002', 1),
('PC1A20001', 2),
('PC1A20002', 2),
('PA1A20001', 3),
('PA1A20002', 3);

INSERT INTO `traza` (`ID`, `REFERENCIA`, `TRAZA_ID`, `DATA`, `LOCALIZACION`, `LATITUD`, `LONGITUD`) VALUES
(1, 'PM1A20001', 1, '2020-02-23 16:18:03', 'O Covelo, Lodoselo', 42.0774, -7.59567),
(2, 'PM1A20001', 2, '2020-03-18 09:18:15', 'O Covelo, Lodoselo', 42.0774, -7.59567),
(3, 'PM1A20001', 3, '2020-03-20 15:08:03', 'Mais Que Pan', 42.0312, -7.9766),
(4, 'PM1A20001', 4, '2020-03-22 04:52:30', 'Mais Que Pan', 42.0312, -7.9766),
(5, 'PM1A20001', 5, '2020-03-22 07:18:03', 'Mais Que Pan', 42.0312, -7.9766),
(6, 'PM1A20001', 6, '2020-03-22 08:30:14', 'Mais Que Pan', 42.0312, -7.9766),
(7, 'PM1A20002', 1, '2020-02-23 07:26:27', 'O Covelo, Lodoselo', 42.0766, -7.59547),
(8, 'PM1A20002', 2, '2020-03-23 09:26:27', 'O Covelo, Lodoselo', 42.0766, -7.59547),
(9, 'PM1A20002', 3, '2020-03-24 03:26:27', 'Mais Que Pan', 42.0312, -7.9766),
(10, 'PM1A20002', 4, '2020-03-24 05:26:27', 'Mais Que Pan', 42.0312, -7.9766),
(11, 'PM1A20002', 5, '2020-03-24 08:26:27', 'Mais Que Pan', 42.0312, -7.9766),
(12, 'PM1A20002', 6, '2020-03-24 09:26:27', 'Mais Que Pan', 42.0312, -7.9766),
(13, 'PC1A20001', 7, '2020-03-24 07:30:11', 'Milucho', 42.2977, -8.60343),
(14, 'PC1A20001', 8, '2020-03-24 08:30:11', 'Milucho', 42.2977, -8.60343),
(15, 'PC1A20001', 9, '2020-03-24 10:19:11', 'Milucho', 42.2977, -8.60343),
(16, 'PC1A20001', 10, '2020-03-24 11:46:37', 'Milucho', 42.2977, -8.60343),
(17, 'PC1A20001', 11, '2020-03-24 12:13:51', 'Milucho', 42.2977, -8.60343),
(18, 'PC1A20002', 7, '2020-03-25 03:35:43', 'Milucho', 42.2977, -8.60343),
(19, 'PC1A20002', 8, '2020-03-25 05:35:43', 'Milucho', 42.2977, -8.60343),
(20, 'PC1A20002', 9, '2020-03-25 06:35:43', 'Milucho', 42.2977, -8.60343),
(21, 'PC1A20002', 10, '2020-03-25 08:35:43', 'Milucho', 42.2977, -8.60343),
(22, 'PC1A20002', 11, '2020-03-25 09:19:25', 'Milucho', 42.2977, -8.60343),
(23, 'PA1A20001', 12, '2020-03-01 17:39:07', 'Cercedo, Pontevedra', 42.5482, -8.44509),
(24, 'PA1A20001', 13, '2020-03-26 04:29:41', 'Cercedo, Pontevedra', 42.5482, -8.44509),
(25, 'PA1A20001', 14, '2020-03-29 04:39:07', 'O Panadeiro, Codeseda', 42.6195, -8.43754),
(26, 'PA1A20001', 15, '2020-03-29 07:15:32', 'O Panadeiro, Codeseda', 42.6195, -8.43754),
(27, 'PA1A20002', 12, '2020-03-02 15:26:35', 'Cercedo, Pontevedra', 42.5415, -8.39388),
(28, 'PA1A20002', 13, '2020-03-25 07:30:09', 'Cercedo, Pontevedra', 42.5415, -8.39388),
(29, 'PA1A20002', 14, '2020-03-28 06:19:47', 'O Panadeiro, Codeseda', 42.6195, -8.43754),
(30, 'PA1A20002', 15, '2020-03-28 10:05:10', 'O Panadeiro, Codeseda', 42.6195, -8.43754);
